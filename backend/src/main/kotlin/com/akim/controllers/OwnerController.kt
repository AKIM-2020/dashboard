package com.akim.controllers

import com.akim.dto.OwnerInfo
import com.akim.dto.TransferDto
import com.akim.repositories.OwnerRepository
import io.swagger.annotations.Api
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal

@Api("owner-resource")
@RestController
@RequestMapping("/api/v1/owner")
class OwnerController(private val ownerRepository: OwnerRepository) {

    @GetMapping
    fun getOwnerInfo(): OwnerInfo {

        return ownerRepository.findAll()[0].let {
            OwnerInfo(
                login = it.user.login,
                balance = it.balance,
                email = it.user.email
            )
        }

    }

    fun transferToSuperAdmin(transfer: TransferDto) {




    }


}
