package com.akim.controllers

import com.akim.domain.User
import com.akim.dto.Roles
import com.akim.dto.TransactionCollectionDto
import com.akim.dto.TransactionRequest
import com.akim.dto.TransferDto
import com.akim.exceptions.BadRequestException
import com.akim.services.TransferService
import com.akim.services.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid


//todo rewrite better all service))
@Api("transaction-resource")
@RestController
@RequestMapping("/api/v1")
class TransactionController(
        private val userService: UserService,
        private val transferService: TransferService
) {


    @PostMapping("/transaction")
    fun transfer(@Valid @RequestBody request: TransferDto) {
        val currentUser = userService.getCurrentUser()
        val childUser = userService.getChildUserById(request.id)
        transferService.makeTransaction(request, currentUser, childUser)
    }


    @GetMapping("/transaction-list")
    @ApiOperation("get transaction history")
    fun getTransactionList(
            @ApiParam @PageableDefault(size = 20) pageable: Pageable,
            @RequestParam(required = false) role: Roles?,
            request: TransactionRequest
    ): ResponseEntity<TransactionCollectionDto> {
        val currentUser = userService.getCurrentUser()

        role?.let { validateRoles(it, currentUser) }

        val users =
                role?.let {getChildUsers(it, currentUser) }
                        ?: listOf(userService.getCurrentUser())

        return ResponseEntity(transferService.getAllTransactionsByUserList(request, users, pageable), HttpStatus.OK)
    }

    // need refactor costylization
    private fun getChildUsers(role: Roles, currentUser: User): List<User> {
        if (currentUser.role == Roles.OWNER) {
            return userService.getUsersByRole(role)
        }
        var predicateUsers = listOf(currentUser)
        when (role) {
            Roles.CASHIER -> {
                if (currentUser.role == Roles.SUPER_ADMIN) {
                    predicateUsers = userService.getAllChildUsersByRoleAndUsers(role, listOf(currentUser))
                }
            }
            Roles.USER -> {
                if (currentUser.role == Roles.SUPER_ADMIN) {
                    val allAdmins = userService.getAllChildUsersByRoleAndUsers(role, listOf(currentUser))
                    predicateUsers = userService.getAllChildUsersByRoleAndUsers(role, allAdmins)
                } else if (currentUser.role == Roles.ADMIN) {
                    predicateUsers = userService.getAllChildUsersByRoleAndUsers(role, listOf(currentUser))
                }
            }
        }

        return userService.getAllChildUsersByRoleAndUsers(role, predicateUsers)
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