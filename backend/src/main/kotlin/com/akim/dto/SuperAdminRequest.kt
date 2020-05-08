package com.akim.dto


data class SuperAdminRequest(
    var login: String?,
    var password: String?,
    var firstName: String?,
    var lastName: String?,
    var city: String?,
    var email: String?,
    var currency: Currency?
)
