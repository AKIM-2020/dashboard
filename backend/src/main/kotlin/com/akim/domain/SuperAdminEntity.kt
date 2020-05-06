package com.akim.domain

import com.akim.dto.Currency
import com.akim.security.domain.User
import org.hibernate.annotations.Type
import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "super_admins")
data class SuperAdminEntity(

    @Id
    @GeneratedValue(generator="super_admins_seq")
    @SequenceGenerator(name="super_admins_seq",sequenceName="super_admins_seq", allocationSize = 1)
    var id: Long?,
    var firstName: String,
    var lastName: String,
    var city: String,
    var balance: BigDecimal,
    @Enumerated(EnumType.STRING)
    var currency: Currency,


    @OneToOne(cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "user_id")
    val user: User
)
