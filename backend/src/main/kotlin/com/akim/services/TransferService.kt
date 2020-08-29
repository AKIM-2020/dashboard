package com.akim.services

import com.akim.domain.Operation
import com.akim.domain.OperationType
import com.akim.domain.Transaction
import com.akim.domain.User
import com.akim.dto.TransactionCollectionDto
import com.akim.dto.TransactionInfo
import com.akim.dto.TransactionRequest
import com.akim.dto.TransferDto
import com.akim.exceptions.LowBalanceException
import com.akim.repositories.OperationRepository
import com.akim.repositories.TransactionRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.LocalDateTime

@Service
class TransferService(
        private val transactionRepository: TransactionRepository,
        private val operationRepository: OperationRepository,
        private val userSerivce: UserService
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

    fun getAllTransactionsByUserList(
            request: TransactionRequest,
            users: List<User>,
            pageable: Pageable
    ): TransactionCollectionDto {

        val transactions =
                transactionRepository.findAll(createSpecification(request, users), pageable)
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

    private fun createSpecification(request: TransactionRequest, users: List<User>): Specification<Transaction> {
        return Specification { root, query, cb ->

            var predicate = cb.and()

            predicate = cb.or(
                    cb.`in`(root.get<List<User>>("source")).value(users),
                    cb.`in`(root.get<List<User>>("destination")).value(users))


            request.senderId?.let {
                val userById = userSerivce.getUserById(request.senderId)
                predicate = cb.and(predicate, cb.equal(root.get<User>("source"), userById))
            }

            request.receiverId?.let {
                val userById = userSerivce.getUserById(request.receiverId)
                predicate = cb.and(predicate, cb.equal(root.get<User>("destination"), userById))
            }

            request.dateFrom?.let {
                predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("created"), request.dateFrom))
            }

            request.dateTo?.let {
                predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("created"), request.dateTo))
            }

            predicate
        }

    }

    private fun toTransactionInfo(transaction: Transaction): TransactionInfo {

        val oldBalance = transaction.getOperations()[1].oldBalance

        return TransactionInfo(
                transaction.source.id,
                transaction.destination.id,
                transaction.source.authUser.login,
                transaction.destination.authUser.login,
                transaction.amount,
                transaction.note,
                transaction.created,
                oldBalance,
                oldBalance + transaction.amount
        )
    }

    private fun User.toOperation(operationType: OperationType) =
            Operation(
                    oldBalance = this.balance,
                    operationType = operationType,
                    user = this
            )
}
