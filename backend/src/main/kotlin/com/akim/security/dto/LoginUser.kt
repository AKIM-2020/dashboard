package com.akim.security.dto

import javax.validation.constraints.NotBlank

data class LoginUser(@NotBlank var login: String, @NotBlank var password: String)
