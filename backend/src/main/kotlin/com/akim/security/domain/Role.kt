package com.akim.security.domain

import com.akim.dto.Roles
import javax.persistence.*

@Entity
@Table(name = "roles")
data class Role(
    @Id
    @GeneratedValue(generator="roles_seq")
    @SequenceGenerator(name="roles_seq",sequenceName="roles_seq", allocationSize = 1)
    val id: Long,

    @Enumerated(EnumType.STRING)
    val name: Roles
)
