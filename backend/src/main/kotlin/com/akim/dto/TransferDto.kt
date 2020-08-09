package com.akim.dto

import com.akim.domain.OperationType
import java.math.BigDecimal

data class TransferDto (
    val id: Long,
    val amount: BigDecimal,
    val note: String,
    val operationType: OperationType
)
