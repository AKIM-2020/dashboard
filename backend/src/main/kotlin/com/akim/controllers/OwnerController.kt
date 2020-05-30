package com.akim.controllers

import com.akim.dto.*
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
            ResponseEntity.ok(userService.getUsersByRole(Roles.ADMIN))

    @GetMapping("/cashiers")
    @ApiOperation("getting list of cashiers")
    fun getCashiers(): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getUsersByRole(Roles.CASHIER))

    @GetMapping("/users")
    @ApiOperation("getting list of users")
    fun getUsers(): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getUsersByRole(Roles.USER))

    @PostMapping("/transaction")
    fun transferWithSuperAdmin(@RequestBody request: TransferDto) {
        transferService.makeTransaction(request)
    }

    @GetMapping("/transactions")
    fun getTransactionList():TransactionCollectionDto {
        return transferService.getAllTransactionCurrentUser()
    }
}
