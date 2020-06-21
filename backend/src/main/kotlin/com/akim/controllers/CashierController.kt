package com.akim.controllers

import com.akim.dto.*
import com.akim.services.TransferService
import com.akim.services.UserService
import com.akim.services.toUserInfo
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Api("cashier-resource")
@Controller
@RequestMapping("/api/v1/cashier")
class CashierController(
        private val userService: UserService,
        private val transferService: TransferService
) {

    @GetMapping
    fun getCurrentUserInfo(): ResponseEntity<UserInfo> {
        return ResponseEntity(userService.getCurrentUser().toUserInfo(), HttpStatus.OK)
    }

    @GetMapping("/user-list")
    @ApiOperation("getting list users")
    fun getUsers(): ResponseEntity<List<UserInfo>> {
        return ResponseEntity.ok(userService.getAllChildUsers()
                .map { it.toUserInfo() }
                .toCollection(arrayListOf()))
    }


    @PostMapping("/transaction")
    @ApiOperation("make Transaction")
    fun makeTransaction(@RequestBody request: TransferDto) {
        val currentUser = userService.getCurrentUser()
        val childUser = userService.getChildUserById(request.id)
        transferService.makeTransaction(request, currentUser, childUser)
    }

    @GetMapping("/transaction-list")
    @ApiOperation("get transaction history")
    fun getTransactionList(): ResponseEntity<TransactionCollectionDto> {

        val users = listOf(userService.getCurrentUser())

        return ResponseEntity(transferService.getAllTransactionsByUserList(users), HttpStatus.OK)
    }

    @PostMapping("/user")
    @ApiOperation("creating user")
    fun createChild(@RequestBody createRequest: UserCreateRequest): ResponseEntity<Any> {
        userService.createUser(createRequest, Roles.USER)
        return ResponseEntity.accepted().build()
    }

    @PutMapping("/user/{id}")
    @ApiOperation("updating user")
    fun updateChild(
            @PathVariable("id") id: Long,
            @RequestBody request: UserUpdateRequest): ResponseEntity<Any> {
        userService.updateUser(id, request)
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/user/{id}")
    @ApiOperation("deleting user")
    fun deleteChild(@PathVariable("id") id: Long): ResponseEntity<Any> {
        userService.deleteChildUser(id)
        return ResponseEntity.accepted().build()
    }

    @GetMapping("/user/{id}")
    @ApiOperation("getting by id user")
    fun getChild(@PathVariable("id") id: Long): ResponseEntity<Any> {
        return ResponseEntity.ok(userService.getChildUserById(id).toUserInfo())
    }
}

