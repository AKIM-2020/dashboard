package com.akim.repositories

import com.akim.domain.User
import com.akim.dto.Roles
import com.akim.security.domain.AuthUser
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {

    fun findByIdAndRole(id: Long, roles: Roles) : User?

    fun findByAuthUser(authUser: AuthUser): User

    fun findAllByRole(role: Roles): List<User>

}
