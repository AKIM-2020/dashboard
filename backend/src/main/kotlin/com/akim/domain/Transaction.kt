package com.akim.domain

import java.math.BigDecimal
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "transactions")
class Transaction(

    @ManyToOne
    val source: RoleEntity,
    @ManyToOne
    val destination: RoleEntity,

    val note: String,

    val amount: BigDecimal,

    val created: LocalDateTime,

    @OneToMany
    var operations: List<Operations>

) {
    @Id
    val id: Long = 0
}
