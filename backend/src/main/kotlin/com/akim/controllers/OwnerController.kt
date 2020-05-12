package com.akim.controllers

import com.akim.dto.Roles
import com.akim.dto.TransferDto
import com.akim.dto.UserInfo
import com.akim.security.services.UaaService
import com.akim.services.TransferService
import com.akim.services.UserService
import io.swagger.annotations.Api
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


    @PostMapping("/transfer")
    fun transferToSuperAdmin(@RequestBody request: TransferDto) {

        val currentOwner = userService.getCurrentUser()

        val superAdmin =
            userService.getUserByIdAndRole(request.id, Roles.SUPER_ADMIN)

        if(request.isTransfer) {
            transferService.transferMoney(
                currentOwner, superAdmin,
                request.amount, request.note)
        } else {
            transferService.transferMoney(
                superAdmin, currentOwner,
                request.amount, request.note)
        }
    }
}
