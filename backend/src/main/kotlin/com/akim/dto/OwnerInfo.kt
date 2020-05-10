package com.akim.dto

import java.math.BigDecimal

data class OwnerInfo(
    val login: String,
    val balance: BigDecimal,
    val email: String
)
