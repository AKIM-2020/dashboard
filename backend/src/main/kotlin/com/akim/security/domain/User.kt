package com.akim.security.domain

import javax.persistence.*

@Entity
@Table(name = "users")
data class User(

    @Id
    @GeneratedValue(generator="users_seq")
    @SequenceGenerator(name="users_seq",sequenceName="users_seq", allocationSize = 1)
    var id: Long?,
    var login: String,
    var email: String,
    var password: String,

    @ManyToMany
    @JoinTable(name = "users_roles",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    )
    var roles: Collection<Role>
)
