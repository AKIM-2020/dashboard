package com.akim.security.services

import com.akim.exceptions.UserAlreadyExistException
import com.akim.security.domain.User
import com.akim.security.dto.NewUser
import com.akim.security.mappers.UserMapper
import com.akim.security.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
    val userRepository: UserRepository,
    val userMapper: UserMapper
) {

    fun createUser(newUser: NewUser): User {
        if (userRepository.existsByUserName(newUser.userName)) {
            throw UserAlreadyExistException("User with login '${newUser.userName}' already exist")
        }
        if (userRepository.existsByEmail(newUser.email)) {
            throw UserAlreadyExistException("User with email '${newUser.email}' already exist")
        }
        val user = userMapper.newUserToUser(newUser)
        return userRepository.save(user)
    }


}
