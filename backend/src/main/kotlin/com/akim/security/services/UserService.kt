package com.akim.security.services

import com.akim.exceptions.UserAlreadyExistException
import com.akim.security.domain.User
import com.akim.security.dto.NewUser
import com.akim.security.repositories.RoleRepository
import com.akim.security.repositories.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    val userRepository: UserRepository,
    val roleRepository: RoleRepository,
    val passwordEncoder: BCryptPasswordEncoder
) {

    fun createUser(newUser: NewUser): User {
        if (userRepository.existsByLogin(newUser.login)) {
            throw UserAlreadyExistException("User with login '${newUser.login}' already exist")
        }
        if (userRepository.existsByEmail(newUser.email)) {
            throw UserAlreadyExistException("User with email '${newUser.email}' already exist")
        }
        return newUser.let {
            userRepository.save(User(
                id = null,
                login = it.login,
                password = passwordEncoder.encode(it.password),
                email = it.email,
                roles = listOf(roleRepository.findByName(it.role))
            ))
        }
    }
}
