package com.akim.dto

import java.math.BigDecimal

data class AdminDto(
    var id: Long,
    var login: String,
    var name: String,
    var surname: String,
    var superadmin_id: Long,
    var city: String,
    var role: Roles,
    var balance: BigDecimal
)
