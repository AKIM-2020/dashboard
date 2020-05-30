package com.akim.dto

import com.akim.domain.OperationType
import java.math.BigDecimal
import java.time.LocalDateTime

data class TransactionInfo(
    val destinationId: Long,
    val amount: BigDecimal,
    val type: OperationType,
    val note: String,
    val created: LocalDateTime
)


