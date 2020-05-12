package com.akim.services

import com.akim.domain.User
import com.akim.dto.UserInfo
import com.akim.dto.UserCreateRequest
import com.akim.dto.Roles
import com.akim.dto.UserUpdateRequest
import com.akim.repositories.UserRepository
import com.akim.security.domain.AuthUser
import com.akim.security.dto.NewAuthUser
import com.akim.security.services.UaaService
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import javax.persistence.EntityNotFoundException

@Service
@Transactional
class UserService(
    private val userRepository: UserRepository,
    private val uaaService: UaaService
) {
    fun createUser(createRequest: UserCreateRequest, role: Roles) {
        val authUser = createRequest
            .toNewAuthUser(role)
            .run(uaaService::createUser)
        createRequest
            .toNewUser(authUser, role)
            .apply {
                val parent = getCurrentUser()
                parent.addChild(this)
            }
            .also {
                userRepository.save(it)
            }
    }

    fun updateSuperAdmin(id: Long, updateRequest: UserUpdateRequest, role: Roles): Unit? {

        val user = getUserByIdAndRole(id, role)

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
        return Unit
    }

    fun deleteUser(id: Long, role: Roles) {
        val user = getUserByIdAndRole(id, role)
            user
                .apply {
                    parent?.let {
                        it.removeChild(this)
                    }
                }
                .also(userRepository::delete)
    }

    fun getUsers(role: Roles): List<UserInfo> = userRepository.findAllByRole(role)
        .map { it.toUserInfo() }
        .toCollection(arrayListOf())

    fun getUserById(id: Long, role: Roles): UserInfo? = getUserByIdAndRole(id, role)?.toUserInfo()

    fun getCurrentUserInfo(): UserInfo = getCurrentUser().toUserInfo()

    fun getUserByIdAndRole(id: Long, role: Roles) =
        userRepository.findByIdAndRole(id, role)
            ?: throw EntityNotFoundException("$role with id=$id not found")


    private fun UserCreateRequest.toNewUser(authUser: AuthUser, role: Roles): User {
        return User(
            firstName = firstName,
            lastName = lastName,
            city = city,
            authUser = authUser,
            role = role,
            balance = BigDecimal.ZERO
        )
    }

    private fun UserCreateRequest.toNewAuthUser(role: Roles): NewAuthUser {
        return NewAuthUser(
            login = login,
            role = role,
            password = password,
            email = email
        )
    }

    private fun User.toUserInfo(): UserInfo {
        return UserInfo(
            id = id,
            login = authUser.login,
            name = firstName,
            surname = lastName,
            city = city,
            balance = balance,
            role = role
        )
    }

    fun getCurrentUser(): User {
        return userRepository.findByAuthUser(uaaService.getCurrentUser())
    }
}
