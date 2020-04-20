package com.akim.security.repositories

import com.akim.security.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param

interface UserRepository: JpaRepository<User, Long> {

    fun findByUserName(@Param("userName") userName: String): User?

    fun findByEmail(@Param("email") email: String): User?

}