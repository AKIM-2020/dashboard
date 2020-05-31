package com.akim.controllers

import com.akim.dto.Roles
import com.akim.dto.TransactionCollectionDto
import com.akim.dto.TransferDto
import com.akim.dto.UserInfo
import com.akim.services.TransferService
import com.akim.services.UserService
import com.akim.services.toUserInfo
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Api("owner-resource")
@RestController
@RequestMapping("/api/v1/owner")
class OwnerController(
        private val userService: UserService,
        private val transferService: TransferService
) {

    @GetMapping
    fun getOwnerInfo(): UserInfo {
        return userService.getCurrentUser().toUserInfo()
    }

    @GetMapping("/super-admins")
    @ApiOperation("getting list of Super Admins")
    fun getSuperAdmins(): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getAllChildUsers())

    @GetMapping("/admins")
    @ApiOperation("getting list of Admins")
    fun getAdmins(): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getUsersByRole(Roles.ADMIN)
                    .map { it.toUserInfo() }
                    .toCollection(arrayListOf()))

    @GetMapping("/cashiers")
    @ApiOperation("getting list of cashiers")
    fun getCashiers(): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getUsersByRole(Roles.CASHIER)
                    .map { it.toUserInfo() }
                    .toCollection(arrayListOf()))

    @GetMapping("/users")
    @ApiOperation("getting list of users")
    fun getUsers(): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getUsersByRole(Roles.USER)
                    .map { it.toUserInfo() }
                    .toCollection(arrayListOf()))

    @PostMapping("/transaction")
    fun transferWithSuperAdmin(@RequestBody request: TransferDto) {
        val currentUser = userService.getCurrentUser()
        val childUser = userService.getChildUserById(request.id)
        transferService.makeTransaction(request, currentUser, childUser)
    }

    @GetMapping("/transactions")
    fun getTransactionList(
            @RequestParam(required = false) role: Roles?
    ): TransactionCollectionDto {
            val users =
                    role?.let { userService.getUsersByRole(it) }
                            ?: listOf(userService.getCurrentUser())

             return transferService.getAllTransactionsByUserList(users)

    }


}
