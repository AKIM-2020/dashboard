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
        private val operationRepository: OperationRepository,
        private val userService: UserService
) {

    fun makeTransaction(request: TransferDto) {
        when (request.operationType) {
            OperationType.TRANSFER ->
                createTransaction(userService.getCurrentUser(), userService.getChildUserById(request.id), request)
            OperationType.WITHDRAW ->
                createTransaction(userService.getChildUserById(request.id), userService.getCurrentUser(), request)
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

    fun getAllTransactionCurrentUser(): TransactionCollectionDto {

        val user = userService.getCurrentUser()

        val transactions = transactionRepository.getAllBySourceOrDestination(user, user)
                .map { toTransactionInfo(it, user) }
                .toCollection(arrayListOf())

        val debit = operationRepository.getDebitByUser(user) ?: BigDecimal.ZERO
        val credit = operationRepository.getCreditByUser(user) ?: BigDecimal.ZERO

        val balance = debit.minus(credit)


        return TransactionCollectionDto(
                debit,
                credit,
                balance,
                transactions)
    }

    private fun toTransactionInfo(
            transaction: Transaction,
            currentUser: User
    ): TransactionInfo {

        val type: OperationType
        val destinationId: Long

        when (currentUser.id) {
            transaction.source.id -> {
                type = OperationType.TRANSFER
                destinationId = transaction.destination.id
            }
            else -> {
                type = OperationType.WITHDRAW
                destinationId = transaction.source.id
            }
        }

        return TransactionInfo(
                destinationId, transaction.amount, type,
                transaction.note, transaction.created
        )
    }

    private fun User.toOperation(operationType: OperationType) =
            Operation(
                    oldBalance = this.balance,
                    operationType = operationType,
                    user = this
            )
}
