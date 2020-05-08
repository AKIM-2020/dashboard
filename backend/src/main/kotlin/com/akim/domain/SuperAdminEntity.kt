package com.akim.domain

import com.akim.dto.Currency
import com.akim.security.domain.User
import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "super_admins")
class SuperAdminEntity(

    var firstName: String,

    var lastName: String,

    var city: String,

    var balance: BigDecimal,

    @Enumerated(EnumType.STRING)
    var currency: Currency,

    @OneToOne(cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "user_id")
    val user: User

) {

    @Id
    @GeneratedValue(generator="super_admins_seq")
    @SequenceGenerator(name="super_admins_seq",sequenceName="super_admins_seq", allocationSize = 1)
    var id: Long = 0

    @ManyToOne(fetch = FetchType.LAZY)
    var owner: OwnerEntity? = null

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as SuperAdminEntity
        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }


}

