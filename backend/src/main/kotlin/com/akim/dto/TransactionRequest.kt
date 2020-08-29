package com.akim.dto

import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime

data class TransactionRequest (
        val senderId: Long?,
        val receiverId: Long?,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        val dateFrom: LocalDateTime?,
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        val dateTo: LocalDateTime?
)