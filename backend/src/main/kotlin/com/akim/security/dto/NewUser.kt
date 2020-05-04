package com.akim.security.dto

import com.akim.dto.Roles
import com.github.pozo.KotlinBuilder

data class NewUser(
    val userName: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val role: Roles
)

