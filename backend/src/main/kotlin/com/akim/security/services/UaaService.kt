package com.akim.security.services

import com.akim.exceptions.UserAlreadyExistException
import com.akim.security.domain.AuthUser
import com.akim.security.dto.NewAuthUser
import com.akim.security.repositories.AuthUserRepository
import com.akim.security.repositories.RoleRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException

@Service
class UaaService(
    private val authUserRepository: AuthUserRepository,
    private val roleRepository: RoleRepository,
    private val passwordEncoder: BCryptPasswordEncoder
) {
    fun createUser(newAuthUser: NewAuthUser): AuthUser {
        newAuthUser
            .apply {checkLogin(login)}
            .apply {checkEmail(email)}
        return newAuthUser.let {
            authUserRepository.save(AuthUser(
                id = null,
                login = it.login,
                password = passwordEncoder.encode(it.password),
                email = it.email,
                roles = listOf(roleRepository.findByName(it.role))
            ))
        }
    }

    fun getCurrentUser(): AuthUser {
        val authentication = SecurityContextHolder.getContext().authentication
        var userLogin =
            if (authentication.principal is UserDetails) {
                val userDetails = authentication.principal as UserDetails
                userDetails.username
            } else {
                authentication.principal as String
            }
        return authUserRepository.findByLogin(userLogin)
            ?: throw EntityNotFoundException("User with login=$userLogin not found")

    }

    fun checkEmail(email: String) {
        if (authUserRepository.existsByEmail(email)) {
            throw UserAlreadyExistException("User with email '${email}' already exist")
        }
    }

    fun checkLogin(login: String) {
        if (authUserRepository.existsByLogin(login)) {
            throw UserAlreadyExistException("User with login '${login}' already exist")
        }
    }

    fun encodePassword(password: String): String {
        return passwordEncoder.encode(password)
    }

}
