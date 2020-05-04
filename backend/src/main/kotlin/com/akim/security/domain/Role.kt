package com.akim.security.domain

import com.akim.dto.Roles
import javax.persistence.*

@Entity
@Table(name = "roles")
data class Role(
    @Id
    val id: Long,

    @Enumerated(EnumType.STRING)
    val name: Roles
)
