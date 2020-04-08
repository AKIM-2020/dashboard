package com.akim.security.repositories

import com.akim.security.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import java.util.*

interface UserRepository: JpaRepository<User, Long> {

    fun existsByUserName(@Param("userName") userName: String): Boolean

    fun findByUserName(@Param("userName") userName: String): Optional<User>

    fun findByEmail(@Param("email") email: String): Optional<User>

    @Transactional
    fun deleteByUserName(@Param("userName") userName: String)

}