package com.akim.security.dto

import com.akim.dto.Roles

data class NewAuthUser(
    val login: String,
    val email: String,
    val password: String,
    val role: Roles
)

