package com.akim.security.domain

import com.github.pozo.KotlinBuilder
import javax.persistence.*

@Entity
@Table(name = "users")
data class User(

    @Id
    var id: Long,
    var userName: String,
    var email: String,
    var password: String,
    var enabled: Boolean,

    @ManyToMany
    @JoinTable(name = "users_roles",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    )
    var roles: Collection<Role>? = null
)
