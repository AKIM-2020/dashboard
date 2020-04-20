package com.akim.security.domain

import javax.persistence.*

@Entity
@Table(name = "users")
data class User(


    @Id
    val id: Long = 0,
    var userName: String,
    var firstName: String,
    var lastName: String,
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
