package com.akim.security.repositories

import com.akim.security.domain.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long> {

    fun findByLogin(login: String): User?

    fun existsByLogin(userName: String): Boolean

    fun existsByEmail(email: String): Boolean

}
