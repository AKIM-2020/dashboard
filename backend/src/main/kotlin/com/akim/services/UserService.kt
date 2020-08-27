package com.akim.services

import com.akim.domain.User
import com.akim.dto.Roles
import com.akim.dto.UserCreateRequest
import com.akim.dto.UserUpdateRequest
import com.akim.repositories.UserRepository
import com.akim.security.services.UaaService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityNotFoundException

@Service
class UserService(
        private val userRepository: UserRepository,
        private val uaaService: UaaService
) {

    fun getChildUserById(id: Long) = userRepository.findByIdAndParent(id, getCurrentUser())
            ?: throw EntityNotFoundException("You don't have user with id=$id ")

    fun getAllChildUsers() = userRepository.findAllByParent(getCurrentUser())

    fun getAllChildUsersByRoleAndUsers(role: Roles, users: List<User>) = userRepository.findAllByRoleAndParentIn(role, users)

    fun getAllChildUsersByUserList(users: List<User>) = userRepository.findAllByParentIn(users)

    @Transactional
    fun createUser(createRequest: UserCreateRequest, role: Roles) {

        val authUser = createRequest
                .toNewAuthUser(role)
                .run(uaaService::createUser)

        createRequest
                .toNewUser(authUser, role)
                .apply { getCurrentUser().addChild(this) }
                .also { userRepository.save(it) }
    }

    fun updateUser(id: Long, updateRequest: UserUpdateRequest) {

        val user = getChildUserById(id)

        updateRequest.firstName?.let {
            user.firstName = it
        }
        updateRequest.lastName?.let {
            user.lastName = it
        }
        updateRequest.city?.let {
            user.city = it
        }
        updateRequest.password?.let {
            user.authUser.password = uaaService.encodePassword(it)
        }
        updateRequest.email?.let {
            uaaService.checkEmail(it)
            user.authUser.email = it
        }
        userRepository.save(user)
    }

    fun deleteChildUser(id: Long) {
        getChildUserById(id)
                .apply {
                    parent?.removeChild(this)
                }
                .also(userRepository::delete)
    }

    fun getUsersByRole(role: Roles): List<User> =
            userRepository.findAllByRole(role)

    fun getCurrentUser(): User {
        return userRepository.findByAuthUser(uaaService.getCurrentUser())
    }

    fun getUserById(id: Long): User = userRepository.findById(id)
            .orElseThrow { EntityNotFoundException("You don't have user with id=$id") }
}
