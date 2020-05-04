package com.akim.security.dto

import org.springframework.security.core.GrantedAuthority

data class JwtResponse(
    var accessToken: String,
    var username: String,
    val authorities: Collection<GrantedAuthority>
)
