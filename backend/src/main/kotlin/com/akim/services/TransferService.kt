package com.akim.services

import com.akim.domain.OperationType
import com.akim.domain.Operations
import com.akim.domain.RoleEntity
import com.akim.domain.Transaction
import com.akim.exceptions.LowBalanceException
import com.akim.repositories.TransactionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class TransferService<T : RoleEntity> (private val transactionRepository: TransactionRepository){

    //transaction manger

    @Transactional
    fun transferMoney(source: T, destination: T, amount: BigDecimal, note: String) {

        // open
        //1 timestamp
        if(source.getBalance() < amount) {
            throw LowBalanceException(source.getId())
        }

        val sourceOperation = Operations(
            source.getBalance(),
            OperationType.DEBITING,
            source
        ).also {
            source.setBalance(source.getBalance().minus(amount))
        }

        val destinationOperation = Operations(
            destination.getBalance(),
            OperationType.ACCRUAL,
            destination
        ).also {
            destination.setBalance(destination.getBalance().plus(amount))
        }

        transactionRepository.save(Transaction(
            source,
            destination,
            note,
            amount,
            LocalDateTime.now(),
            listOf(sourceOperation, destinationOperation))
    }


    // bd - timestamp
    //
    // close
}
