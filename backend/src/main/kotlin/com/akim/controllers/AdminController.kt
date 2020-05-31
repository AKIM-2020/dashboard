package com.akim.controllers

import com.akim.dto.*
import com.akim.exceptions.BadRequestException
import com.akim.services.TransferService
import com.akim.services.UserService
import com.akim.services.toUserInfo
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Api("admin-resource")
@Controller
@RequestMapping("/api/v1/admin")
class AdminController(
        private val userService: UserService,
        private val transferService: TransferService
) {

    @GetMapping
    fun getCurrentUserInfo(): UserInfo {
        return userService.getCurrentUser().toUserInfo()
    }

    @GetMapping("/{role}/user-list")
    @ApiOperation("getting list users")
    fun getUsers(@PathVariable role: Roles): ResponseEntity<List<UserInfo>> {

        val users = userService.getAllChildUsers()

        val response = when (role) {
            Roles.CASHIER -> users
            Roles.USER -> userService.getAllChildUsersByUserList(users)
            else -> throw BadRequestException("Not enough permissions to view $role")
        }

        return ResponseEntity.ok(response
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
    fun getTransactionList(
            @RequestParam(required = false) role: Roles?
    ): TransactionCollectionDto {

        if(role != Roles.CASHIER && role != Roles.USER) {
            throw BadRequestException("Not enough permissions to view $role") //TODO find a suitable exception
        }
        val users =
                role?.let { userService.getUsersByRole(it) }
                        ?: listOf(userService.getCurrentUser())

        return transferService.getAllTransactionsByUserList(users)
    }

    @PostMapping("/user")
    @ApiOperation("creating cashier")
    fun createChild(@RequestBody createRequest: UserCreateRequest): ResponseEntity<Any> {
        userService.createUser(createRequest, Roles.CASHIER)
        return ResponseEntity.accepted().build()
    }

    @PutMapping("/user/{id}")
    @ApiOperation("updating cashier")
    fun updateChild(
            @PathVariable("id") id: Long,
            @RequestBody request: UserUpdateRequest): ResponseEntity<Any> {
        userService.updateUser(id, request)
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/user/{id}")
    @ApiOperation("deleting cashier")
    fun deleteChild(@PathVariable("id") id: Long): ResponseEntity<Any> {
        userService.deleteChildUser(id)
        return ResponseEntity.accepted().build()
    }

    @GetMapping("/user/{id}")
    @ApiOperation("getting by id cashier")
    fun getChild(@PathVariable("id") id: Long): ResponseEntity<Any> {
        return ResponseEntity.ok(userService.getChildUserById(id).toUserInfo())
    }
}

