package com.akim.controllers

import com.akim.services.OwnerService
import com.akim.dto.CreateSuperAdminRequest
import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@Api("Owner")
@Controller
@RequestMapping("/api/v1/owner")
class OwnerController(private val ownerService: OwnerService) {

    @PostMapping("/super-admin")
    fun createSuperAdmin(@RequestBody request: CreateSuperAdminRequest): ResponseEntity<Any> {
        ownerService.createSuperAdmin(request)
        return ResponseEntity.accepted().build()
    }


}
