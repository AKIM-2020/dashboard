package com.akim.security.domain

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "roles")
data class Role(
    @Id
    val id: Long,
    val name: String
)
