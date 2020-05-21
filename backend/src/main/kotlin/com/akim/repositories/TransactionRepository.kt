package com.akim.repositories

import com.akim.domain.Transaction
import com.akim.domain.User
import org.springframework.data.jpa.repository.JpaRepository

interface TransactionRepository : JpaRepository<Transaction, Long> {

    fun getAllBySourceOrDestination(source: User, destination: User) : List<Transaction>

}
