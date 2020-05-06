package com.akim.security.repositories

import com.akim.dto.Roles
import com.akim.security.domain.Role
import org.springframework.data.jpa.repository.JpaRepository

interface RoleRepository: JpaRepository<Role, Long> {

    fun findByName(name: Roles): Role

}
