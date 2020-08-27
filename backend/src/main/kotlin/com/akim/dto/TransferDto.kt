package com.akim.dto

import com.akim.domain.OperationType
import java.math.BigDecimal
import javax.validation.constraints.Positive

data class TransferDto (
    val id: Long,
    @Positive
    val amount: BigDecimal,
    val note: String,
    val operationType: OperationType
)
