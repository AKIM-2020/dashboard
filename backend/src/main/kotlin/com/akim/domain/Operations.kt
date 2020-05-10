package com.akim.domain

import java.math.BigDecimal
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "operations")
class Operations(
    val oldBalance: BigDecimal,
    val operationType: OperationType

) {
    @Id
    val id: Long = 0

    @ManyToOne
    var user:

    @ManyToOne
    val transaction: Transaction? = null
}
