package com.akim.domain

import java.math.BigDecimal
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "transactions")
class Transaction(

    @ManyToOne(
        fetch = FetchType.LAZY,
        cascade = [CascadeType.PERSIST, CascadeType.MERGE]
    )
    @JoinColumn(name = "source_user_id")
    val source: User,

    @ManyToOne(
        fetch = FetchType.LAZY,
        cascade = [CascadeType.PERSIST, CascadeType.MERGE]
    )
    @JoinColumn(name = "destination_user_id")
    val destination: User,

    val note: String,

    val amount: BigDecimal,

    val created: LocalDateTime

) {
    @Id
    @GeneratedValue(generator = "transaction_seq")
    @SequenceGenerator(name = "transaction_seq", sequenceName = "transaction_seq", allocationSize = 1)
    private val id: Long = 0

    @OneToMany(
            mappedBy = "transaction",
            cascade = [CascadeType.PERSIST, CascadeType.MERGE],
            fetch = FetchType.LAZY
    )
    private var operations: List<Operation> = emptyList()

    fun addOperations(operations: List<Operation>) {
        this.operations = operations
        operations.forEach {
            it.transaction = this
        }

    }
}

