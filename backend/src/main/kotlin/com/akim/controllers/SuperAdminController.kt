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

@Api("superAdmin-resource")
@Controller
@RequestMapping("/api/v1/super-admin")
class SuperAdminController(
        private val userService: UserService,
        private val transferService: TransferService
) {

    @GetMapping
    fun getOwnerInfo(): UserInfo {
        return userService.getCurrentUser().toUserInfo()
    }

    @GetMapping("/{role}/user-list")
    @ApiOperation("getting list users")
    fun getAdmins(@PathVariable role: Roles): ResponseEntity<List<UserInfo>> {

        val users = userService.getAllChildUsers()

        val response = when (role) {
            Roles.ADMIN -> users
            Roles.CASHIER -> userService.getAllChildUsersByUserList(users)
            Roles.USER -> {
                val cashiers = userService.getAllChildUsersByUserList(users)
                userService.getAllChildUsersByUserList(cashiers)
            }
            else -> throw BadRequestException("Not enough permissions to view $role")
        }

        return ResponseEntity.ok(response
                .map { it.toUserInfo() }
                .toCollection(arrayListOf()))
    }


    @PostMapping("/transaction")
    fun transferWithSuperAdmin(@RequestBody request: TransferDto) {
        val currentUser = userService.getCurrentUser()
        val childUser = userService.getChildUserById(request.id)
        transferService.makeTransaction(request, currentUser, childUser)
    }

    @GetMapping("/transaction-list")
    fun getTransactionList(
            @RequestParam(required = false) role: Roles?
    ): TransactionCollectionDto {

        if(role == Roles.OWNER || role == Roles.SUPER_ADMIN) {
            throw BadRequestException("Not enough permissions to view $role")
        }
        val users =
                role?.let { userService.getUsersByRole(it) }
                        ?: listOf(userService.getCurrentUser())

        return transferService.getAllTransactionsByUserList(users)
    }

    @PostMapping("/user")
    @ApiOperation("creating admin")
    fun createSuperAdmin(@RequestBody createRequest: UserCreateRequest): ResponseEntity<Any> {
        userService.createUser(createRequest, Roles.ADMIN)
        return ResponseEntity.accepted().build()
    }

    @PutMapping("/user/{id}")
    @ApiOperation("updating admin")
    fun updateSuperAdmin(
            @PathVariable("id") id: Long,
            @RequestBody request: UserUpdateRequest): ResponseEntity<Any> {
        userService.updateUser(id, request)
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/user/{id}")
    @ApiOperation("deleting admin")
    fun deleteSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        userService.deleteChildUser(id)
        return ResponseEntity.accepted().build()
    }

    @GetMapping("/user/{id}")
    @ApiOperation("getting by id admin")
    fun getSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        return ResponseEntity.ok(userService.getChildUserById(id).toUserInfo())
    }
}

