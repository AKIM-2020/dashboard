package com.akim.dto

import java.math.BigDecimal

data class TransferDto (
    val id: Long,
    val amount: BigDecimal,
    val note: String,
    val isTransfer: Boolean
)
