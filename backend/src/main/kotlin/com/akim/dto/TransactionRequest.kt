package com.akim.dto

import java.time.LocalDateTime

data class TransactionRequest (
        val senderId: Long?,
        val receiverId: Long?,
        val dateFrom: LocalDateTime?,
        val dateTo: LocalDateTime?
)