package com.akim.repositories

import com.akim.domain.Operation
import com.akim.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.math.BigDecimal

interface OperationRepository : JpaRepository<Operation, Long> {

    @Query("""select sum(tr.amount) 
        from Operation op
        left join op.transaction tr
         where op.user = ?1 
        and op.operationType = 'WITHDRAW'
        """)
    fun getDebitByUser(user: User): BigDecimal?


    @Query("""select sum(tr.amount) 
        from Operation op
        left join op.transaction tr
         where op.user = ?1 
        and op.operationType = 'TRANSFER'
        """)
    fun getCreditByUser(user: User): BigDecimal?

}


