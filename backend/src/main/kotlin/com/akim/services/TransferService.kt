package com.akim.services

import com.akim.domain.*
import com.akim.exceptions.LowBalanceException
import com.akim.repositories.TransactionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class TransferService(private val transactionRepository: TransactionRepository) {

    @Transactional
    fun transferMoney(source: User, destination: User, amount: BigDecimal, note: String) {

        if (source.balance < amount) {
            throw LowBalanceException(source.id)
        }

        val sourceOperation =
            Operations(
                source.balance,
                OperationType.DEBITING,
                source
            ).also {
                source.balance = source.balance.minus(amount)
            }

        val destinationOperation = Operations(
            destination.balance,
            OperationType.ACCRUAL,
            destination
        ).also {
            destination.balance = destination.balance.plus(amount)
        }

        transactionRepository.save(
            Transaction(
                source,
                destination,
                note,
                amount,
                LocalDateTime.now(),
                listOf(sourceOperation, destinationOperation)
            )
        )
    }
}
