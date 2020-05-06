package com.akim.controllers

import com.akim.dto.AdminDto
import com.akim.services.SuperAdminService
import com.akim.dto.SuperAdminRequest
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Api("superAdmin-resource")
@Controller
@RequestMapping("/api/v1/owner")
class SuperAdminController(private val superAdminService: SuperAdminService) {

    @PostMapping("/super-admin")
    @ApiOperation("creating super admin")
    fun createSuperAdmin(@RequestBody request: SuperAdminRequest): ResponseEntity<Any> {
        superAdminService.createSuperAdmin(request)
        return ResponseEntity.accepted().build()
    }

    @PutMapping("/super-admin/{id}")
    @ApiOperation("updating")
    fun updateSuperAdmin(
        @PathVariable("id") id: Long,
        @RequestBody request: SuperAdminRequest): ResponseEntity<Any> {
        superAdminService.updateSuperAdmin(id, request)
            ?: return ResponseEntity.notFound().build()
        return ResponseEntity.accepted().build()
    }

    @DeleteMapping("/super-admin/{id}")
    @ApiOperation("deleting")
    fun deleteSuperAdmin(@PathVariable("id") id: Long): ResponseEntity<Any> {
        superAdminService.deleteSuperAdmin(id)
        return ResponseEntity.accepted().build()
    }

    @GetMapping("/super-admin")
    @ApiOperation("getting list of superAdmins")
    fun getSuperAdmins(): ResponseEntity<List<AdminDto>> = ResponseEntity.ok(superAdminService.getSuperAdmins())








}
