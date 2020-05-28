package com.akim.controllers

import com.akim.dto.Roles
import com.akim.dto.TransactionInfo
import com.akim.dto.TransferDto
import com.akim.dto.UserInfo
import com.akim.services.TransferService
import com.akim.services.UserService
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
        return userService.getCurrentUserInfo()
    }

    @GetMapping("/super-admins")
    @ApiOperation("getting list of Super Admins")
    fun getSuperAdmins(): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getUsers(Roles.SUPER_ADMIN))

    @GetMapping("/admins")
    @ApiOperation("getting list of Admins")
    fun getAdmins(): ResponseEntity<List<UserInfo>> =
        ResponseEntity.ok(userService.getUsers(Roles.ADMIN))

    @GetMapping("/cashiers")
    @ApiOperation("getting list of cashiers")
    fun getCashiers(): ResponseEntity<List<UserInfo>> =
        ResponseEntity.ok(userService.getUsers(Roles.CASHIER))

    @GetMapping("/users")
    @ApiOperation("getting list of users")
    fun getUsers(): ResponseEntity<List<UserInfo>> =
        ResponseEntity.ok(userService.getUsers(Roles.USER))

    @PostMapping("/transaction")
    fun transferToSuperAdmin(@RequestBody request: TransferDto) {

        val currentOwner = userService.getCurrentUser()

        val superAdmin =
            userService.getUserByIdAndRole(request.id, Roles.SUPER_ADMIN)

        if (request.isTransfer) {
            transferService.transferMoney(
                currentOwner, superAdmin,
                request.amount, request.note)
        } else {
            transferService.transferMoney(
                superAdmin, currentOwner,
                request.amount, request.note)
        }
    }

    @GetMapping("/transactions")
    fun getTransactionList(): List<TransactionInfo> {
        return transferService.getTransactionListByUserId(userService.getCurrentUser())
    }
}
