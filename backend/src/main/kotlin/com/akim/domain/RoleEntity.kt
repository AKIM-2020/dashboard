package com.akim.domain

import com.akim.security.domain.User
import java.math.BigDecimal
import javax.persistence.*

@MappedSuperclass
abstract class RoleEntity {

    var balance: BigDecimal = BigDecimal.ZERO

    @OneToOne(cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "user_id")
    var user: User? = null
}
