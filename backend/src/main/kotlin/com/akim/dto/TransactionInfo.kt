package com.akim.dto

import java.math.BigDecimal
import java.time.LocalDateTime

data class TransactionInfo(
        val senderName: String,
        val receiverName: String,
        val amount: BigDecimal,
        val note: String,
        val created: LocalDateTime
)


