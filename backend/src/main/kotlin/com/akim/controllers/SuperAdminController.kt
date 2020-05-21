package com.akim.controllers

import com.akim.dto.Roles
import com.akim.dto.UserInfo
import com.akim.services.UserService
import com.akim.dto.UserCreateRequest
import com.akim.dto.UserUpdateRequest
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
        userService.updateSuperAdmin(id, request, Roles.SUPER_ADMIN)
            ?: return ResponseEntity.notFound().build()
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/super-admin/{id}")
    @ApiOperation("deleting")
    fun deleteSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        userService.deleteUser(id, Roles.SUPER_ADMIN)
        return ResponseEntity.accepted().build()
    }



    @GetMapping("/super-admin/{id}")
    @ApiOperation("getting by id")
    fun getSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        return ResponseEntity.ok(userService.getUserById(id, Roles.SUPER_ADMIN))
    }
}

