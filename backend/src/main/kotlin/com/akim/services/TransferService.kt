package com.akim.services

import com.akim.domain.Operation
import com.akim.domain.OperationType
import com.akim.domain.Transaction
import com.akim.domain.User
import com.akim.dto.TransactionCollectionDto
import com.akim.dto.TransactionInfo
import com.akim.dto.TransferDto
import com.akim.exceptions.LowBalanceException
import com.akim.repositories.OperationRepository
import com.akim.repositories.TransactionRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class TransferService(
        private val transactionRepository: TransactionRepository,
        private val operationRepository: OperationRepository
) {

    fun makeTransaction(
            request: TransferDto,
            currentUser: User,
            childUser: User
    ) {
        when (request.operationType) {
            OperationType.TRANSFER ->
                createTransaction(currentUser, childUser, request)
            OperationType.WITHDRAW ->
                createTransaction(childUser, currentUser, request)
        }
    }

    private fun createTransaction(source: User, destination: User, request: TransferDto) {

        if (source.balance < request.amount) {
            throw LowBalanceException(source.id)
        }

        val transaction = Transaction(
                source,
                destination,
                request.note,
                request.amount,
                LocalDateTime.now()
        ).also {
            it.addOperations(listOf(
                    source.toOperation(OperationType.TRANSFER),
                    destination.toOperation(OperationType.WITHDRAW)
            ))
        }

        source.balance = source.balance.minus(request.amount)
        destination.balance = destination.balance.plus(request.amount)

        transactionRepository.save(transaction)
    }

    fun getAllTransactionsByUserList(users: List<User>): TransactionCollectionDto {

        val transactions =
                transactionRepository.getAllBySourceInOrDestinationIn(users, users)
                        .map(::toTransactionInfo)
                        .toCollection(arrayListOf())
        val debit = operationRepository.getDebitByUser(users) ?: BigDecimal.ZERO
        val credit = operationRepository.getCreditByUser(users) ?: BigDecimal.ZERO

        val balance = debit.minus(credit)

        return TransactionCollectionDto(
                debit,
                credit,
                balance,
                transactions)
    }

    private fun toTransactionInfo(transaction: Transaction): TransactionInfo {
        return TransactionInfo(
                transaction.source.authUser.login,
                transaction.destination.authUser.login,
                transaction.amount,
                transaction.note,
                transaction.created
        )
    }

    private fun User.toOperation(operationType: OperationType) =
            Operation(
                    oldBalance = this.balance,
                    operationType = operationType,
                    user = this
            )
}
