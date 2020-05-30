package com.akim.dto

import java.math.BigDecimal

data class TransactionCollectionDto (
        val debit: BigDecimal,
        val credit: BigDecimal,
        val balance: BigDecimal,
        val transactions: List<TransactionInfo>
)