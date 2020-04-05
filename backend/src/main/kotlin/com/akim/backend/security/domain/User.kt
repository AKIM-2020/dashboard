package com.akim.backend.security.domain

import com.akim.backend.security.domain.Role
import javax.persistence.*

@Entity
@Table(name = "users")
data class User(

        @Id
        val id: Long? = 0,
        var userName: String? = null,
        var firstName: String? = null,
        var lastName: String? = null,
        var email: String? = null,
        var password: String? = null,
        var enabled: Boolean? = false,

        @ManyToMany
        @JoinTable(name = "users_roles",
                joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
                inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
        )
        var roles: Collection<Role>? = null
)