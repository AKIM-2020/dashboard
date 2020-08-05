package com.akim.controllers

import com.akim.domain.User
import com.akim.dto.Roles
import com.akim.dto.TransactionCollectionDto
import com.akim.dto.TransferDto
import com.akim.exceptions.BadRequestException
import com.akim.services.TransferService
import com.akim.services.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


//todo rewrite better all service))
@Api("transaction-resource")
@RestController
@RequestMapping("/api/v1")
class TransactionController(
        private val userService: UserService,
        private val transferService: TransferService
) {


    @PostMapping("/transaction")
    fun transfer(@RequestBody request: TransferDto) {
        val currentUser = userService.getCurrentUser()
        val childUser = userService.getChildUserById(request.id)
        transferService.makeTransaction(request, currentUser, childUser)
    }


    @GetMapping("/transaction-list")
    @ApiOperation("get transaction history")
    fun getTransactionList(
            @RequestParam(required = false) role: Roles?
    ): ResponseEntity<TransactionCollectionDto> {
        val currentUser = userService.getCurrentUser()

        role?.let { validateRoles(it, currentUser) }

        val users =
                role?.let {getChildAdmins(it, currentUser) }
                        ?: listOf(userService.getCurrentUser())

        return ResponseEntity(transferService.getAllTransactionsByUserList(users), HttpStatus.OK)
    }

    // need refactor costylization
    private fun getChildAdmins(role: Roles, currentUser: User): List<User> {
        return when (role) {
            Roles.ADMIN -> userService.getAllChildUsersByRoleAndUsers(role, listOf(currentUser));
            Roles.CASHIER -> {
                var allAdmins = userService.getAllChildUsersByRoleAndUsers(Roles.ADMIN, listOf(currentUser))
                var allCashiers = userService.getAllChildUsersByRoleAndUsers(Roles.CASHIER, listOf(currentUser))
                var response = ArrayList<User>()
                response.addAll(allAdmins)
                response.addAll(allCashiers)
                return response
            }
            Roles.USER -> {
                var allAdmins = userService.getAllChildUsersByRoleAndUsers(Roles.ADMIN, listOf(currentUser))
                var allCashiers = userService.getAllChildUsersByRoleAndUsers(Roles.CASHIER, allAdmins)
                var allUsers = userService.getAllChildUsersByRoleAndUsers(Roles.USER, allCashiers)
                var response = ArrayList<User>()
                response.addAll(allAdmins)
                response.addAll(allCashiers)
                response.addAll(allUsers)
                return response
            }
            else -> userService.getUsersByRole(role)
        }
    }

    private fun validateRoles(role: Roles, currentUser: User) {
        var isValid = when (currentUser.role) {
            Roles.SUPER_ADMIN -> role == Roles.ADMIN || role == Roles.CASHIER || role == Roles.USER
            Roles.ADMIN -> role == Roles.CASHIER || role == Roles.USER
            Roles.CASHIER -> role == Roles.CASHIER || role == Roles.USER
            Roles.USER -> false
            else -> true
        }
        if (!isValid) {
            throw BadRequestException("Not enough permissions to view $role") //TODO find a suitable exception
        }
    }
}