package com.akim.controllers

import com.akim.dto.*
import com.akim.services.TransferService
import com.akim.services.UserService
import com.akim.services.toUserInfo
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
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
    fun getOwnerInfo(): ResponseEntity<UserInfo> {
        return ResponseEntity(userService.getCurrentUser().toUserInfo(), HttpStatus.OK)
    }

    @GetMapping("/{role}/user-list")
    @ApiOperation("getting list users")
    fun getAdmins(@PathVariable role: Roles): ResponseEntity<List<UserInfo>> =
            ResponseEntity.ok(userService.getUsersByRole(role)
                    .map { it.toUserInfo() }
                    .toCollection(arrayListOf()))

    @PostMapping("/transaction")
    fun transferWithSuperAdmin(@RequestBody request: TransferDto) {
        val currentUser = userService.getCurrentUser()
        val childUser = userService.getChildUserById(request.id)
        transferService.makeTransaction(request, currentUser, childUser)
    }

    @GetMapping("/transaction-list")
    fun getTransactionList(
            @RequestParam(required = false) role: Roles?
    ): ResponseEntity<TransactionCollectionDto> {
        val users =
                role?.let { userService.getUsersByRole(it) }
                        ?: listOf(userService.getCurrentUser())

        return ResponseEntity(transferService.getAllTransactionsByUserList(users), HttpStatus.OK)

    }

    @PostMapping("/user")
    @ApiOperation("creating super admin")
    fun createSuperAdmin(@RequestBody createRequest: UserCreateRequest): ResponseEntity<Any> {
        userService.createUser(createRequest, Roles.SUPER_ADMIN)
        return ResponseEntity.accepted().build()
    }

    @PutMapping("/user/{id}")
    @ApiOperation("updating super admin")
    fun updateSuperAdmin(
            @PathVariable("id") id: Long,
            @RequestBody request: UserUpdateRequest): ResponseEntity<Any> {
        userService.updateUser(id, request)
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/user/{id}")
    @ApiOperation("deleting super admin")
    fun deleteSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        userService.deleteChildUser(id)
        return ResponseEntity.accepted().build()
    }

    @GetMapping("/user/{id}")
    @ApiOperation("getting by id super admin")
    fun getSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        return ResponseEntity.ok(userService.getChildUserById(id).toUserInfo())
    }


}
