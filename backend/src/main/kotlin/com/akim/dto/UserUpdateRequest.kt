package com.akim.dto


data class UserUpdateRequest(
    var password: String?,
    var firstName: String?,
    var lastName: String?,
    var city: String?,
    var email: String?
)
