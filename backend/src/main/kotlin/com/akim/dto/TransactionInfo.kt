package com.akim.dto

import java.math.BigDecimal
import java.time.LocalDateTime

data class TransactionInfo(
        val senderId: Long,
        val receiverId: Long,
        val senderName: String,
        val receiverName: String,
        val amount: BigDecimal,
        val note: String,
        val created: LocalDateTime,
        val oldBalance: BigDecimal,
        val newBalance: BigDecimal
)


