package com.akim.backend.security.repositories

import com.akim.backend.security.domain.Role
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param

interface RoleRepository: JpaRepository<Role, Long> {

    fun findByName(@Param("name") name: String): Role

}