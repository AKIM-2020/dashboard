package com.akim.services

import com.akim.domain.*
import com.akim.dto.TransactionInfo
import com.akim.exceptions.LowBalanceException
import com.akim.repositories.TransactionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class TransferService(
    private val transactionRepository: TransactionRepository
) {

    @Transactional
    fun transferMoney(source: User, destination: User, amount: BigDecimal, note: String) {

        if (source.balance < amount) {
            throw LowBalanceException(source.id)
        }

        val sourceOperation =
            Operation(
                source.balance,
                OperationType.DEBITING,
                source
            ).also {
                source.balance = source.balance.minus(amount)
            }

        val destinationOperation = Operation(
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

    fun getTransactionListByUserId(user: User) : List<TransactionInfo> =
        transactionRepository.getAllBySourceOrDestination(user, user)
            .map { it ->
                var type = OperationType.ACCRUAL
                var destinationId = it.destination.id
                if(it.source.id == user.id) {
                    type = OperationType.DEBITING
                    destinationId = it.source.id
                }
                TransactionInfo(
                    destinationId, it.amount, type,
                    it.note, it.created
                )
            }
            .toCollection(arrayListOf())

}
