package com.akim.repositories

import com.akim.domain.Transaction
import com.akim.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface TransactionRepository : JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {
}
