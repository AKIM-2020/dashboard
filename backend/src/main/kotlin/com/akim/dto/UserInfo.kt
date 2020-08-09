package com.akim.dto

import java.math.BigDecimal

data class UserInfo(
    var id: Long,
    var login: String,
    var name: String,
    var surname: String,
    var city: String,
    var role: Roles,
    var balance: BigDecimal
)
