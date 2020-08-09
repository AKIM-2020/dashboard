package com.akim.services

import com.akim.domain.User
import com.akim.dto.Roles
import com.akim.dto.UserCreateRequest
import com.akim.dto.UserInfo
import com.akim.security.domain.AuthUser
import com.akim.security.dto.NewAuthUser
import java.math.BigDecimal


fun UserCreateRequest.toNewUser(authUser: AuthUser, role: Roles): User {
    return User(
            firstName = firstName,
            lastName = lastName,
            city = city,
            authUser = authUser,
            role = role,
            balance = BigDecimal.ZERO
    )
}

fun UserCreateRequest.toNewAuthUser(role: Roles): NewAuthUser {
    return NewAuthUser(
            login = login,
            role = role,
            password = password,
            email = email
    )
}

fun User.toUserInfo(): UserInfo {
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


