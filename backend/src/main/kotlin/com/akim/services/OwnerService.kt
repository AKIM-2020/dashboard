package com.akim.services

import com.akim.mappers.SuperAdminMapper
import com.akim.repositories.SuperAdminRepository
import com.akim.dto.CreateSuperAdminRequest
import com.akim.security.services.UserService
import org.springframework.stereotype.Service

@Service
class OwnerService(
    private val superAdminRepository: SuperAdminRepository,
    private val superAdminMapper: SuperAdminMapper,
    private val userService: UserService
) {


    fun createSuperAdmin(request: CreateSuperAdminRequest) {
        val user = userService.createUser(superAdminMapper.toNewUser(request))
        superAdminRepository.save(superAdminMapper.toSuperAdminEntity(request, user))
    }

}
