package com.akim.security.repositories

import com.akim.security.domain.AuthUser
import org.springframework.data.jpa.repository.JpaRepository

interface AuthUserRepository: JpaRepository<AuthUser, Long> {

    fun findByLogin(login: String): AuthUser?

    fun existsByLogin(userName: String): Boolean

    fun existsByEmail(email: String): Boolean

}
