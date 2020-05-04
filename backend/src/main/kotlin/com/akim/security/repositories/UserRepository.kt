package com.akim.security.repositories

import com.akim.security.domain.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long> {

    fun findByUserName(userName: String): User?

    fun existsByUserName(userName: String): Boolean

    fun existsByEmail(email: String): Boolean

}
