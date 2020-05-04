package com.akim.domain

import com.akim.security.domain.User
import com.github.pozo.KotlinBuilder
import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "super_admins")
data class SuperAdminEntity(
    @Id
    private val id: Long,
    private val firstName: String,
    private val lastName: String,
    private val city: String,
    private val balance: BigDecimal,

    @OneToOne(cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "user_id")
    private val user: User?
)
