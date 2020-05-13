package com.akim.domain

import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "operations")
class Operation(
    val oldBalance: BigDecimal,
    val operationType: OperationType,

    @ManyToOne(
        fetch = FetchType.LAZY,
        cascade = [CascadeType.PERSIST, CascadeType.MERGE]
    )
    @JoinColumn(name = "user_id")
    var user: User

) {
    @Id
    @GeneratedValue(generator = "operation_seq")
    @SequenceGenerator(name = "operation_seq", sequenceName = "operation_seq", allocationSize = 1)
    val id: Long = 0
    @ManyToOne(
        fetch = FetchType.LAZY,
        cascade = [CascadeType.PERSIST, CascadeType.MERGE]
    )
    @JoinColumn(name = "transaction_id")
    var transaction: Transaction? = null
}
