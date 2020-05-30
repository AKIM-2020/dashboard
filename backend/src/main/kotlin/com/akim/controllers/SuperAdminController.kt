package com.akim.controllers

import com.akim.dto.Roles
import com.akim.services.UserService
import com.akim.dto.UserCreateRequest
import com.akim.dto.UserUpdateRequest
import com.akim.services.toUserInfo
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Api("superAdmin-resource")
@Controller
@RequestMapping("/api/v1/owner")
class SuperAdminController(private val userService: UserService) {

    @PostMapping("/super-admin")
    @ApiOperation("creating super admin")
    fun createSuperAdmin(@RequestBody createRequest: UserCreateRequest): ResponseEntity<Any> {
        userService.createUser(createRequest, Roles.SUPER_ADMIN)
        return ResponseEntity.accepted().build()
    }

    @PutMapping("/super-admin/{id}")
    @ApiOperation("updating")
    fun updateSuperAdmin(
        @PathVariable("id") id: Long,
        @RequestBody request: UserUpdateRequest): ResponseEntity<Any> {
        userService.updateUser(id, request, Roles.SUPER_ADMIN)
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/super-admin/{id}")
    @ApiOperation("deleting")
    fun deleteSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        userService.deleteChildUser(id)
        return ResponseEntity.accepted().build()
    }

    @GetMapping("/super-admin/{id}")
    @ApiOperation("getting by id")
    fun getSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        return ResponseEntity.ok(userService.getChildUserById(id).toUserInfo())
    }
}

