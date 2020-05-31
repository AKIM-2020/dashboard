package com.akim.dto

import java.math.BigDecimal
import java.time.LocalDateTime

data class TransactionInfo(
        val sourceId: Long,
        val destinationId: Long,
        val amount: BigDecimal,
        val note: String,
        val created: LocalDateTime
)


