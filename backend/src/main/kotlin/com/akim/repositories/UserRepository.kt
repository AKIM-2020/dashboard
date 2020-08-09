package com.akim.repositories

import com.akim.domain.User
import com.akim.dto.Roles
import com.akim.security.domain.AuthUser
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {

    fun findByAuthUser(authUser: AuthUser): User

    fun findAllByRole(role: Roles): List<User>

    fun findAllByRoleAndParentIn(role: Roles, parents: List<User>): List<User>

    fun findByIdAndParent(id: Long, parent: User): User?

    fun findAllByParent(parent: User): List<User>

    fun findAllByParentIn(parents: List<User>): List<User>

}
