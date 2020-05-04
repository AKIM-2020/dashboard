package com.akim.mappers

import com.akim.domain.SuperAdminEntity
import com.akim.dto.CreateSuperAdminRequest
import com.akim.security.domain.User
import com.akim.security.dto.NewUser
import org.mapstruct.Mapper


@Mapper
interface SuperAdminMapper {

    fun toNewUser(createSuperAdminRequest: CreateSuperAdminRequest): NewUser

    fun toSuperAdminEntity(createSuperAdminRequest: CreateSuperAdminRequest, user: User): SuperAdminEntity
}
