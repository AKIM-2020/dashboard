package com.akim.domain

import com.akim.dto.Roles
import com.akim.security.domain.AuthUser
import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "users")
class User(

    var firstName: String,

    var lastName: String,

    var city: String,

    var balance: BigDecimal,

    @Enumerated(EnumType.STRING)
    var role: Roles,

    @OneToOne(cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "auth_user_id")
    val authUser: AuthUser

) {

    @Id
    @GeneratedValue(generator="users_seq")
    @SequenceGenerator(name="users_seq",sequenceName="users_seq", allocationSize = 1)
    var id: Long = 0

    @ManyToOne(
        fetch = FetchType.LAZY,
        cascade = [CascadeType.PERSIST, CascadeType.MERGE]
        )
    @JoinColumn(name = "parent_id")
    var parent: User? = null

    @OneToMany(
        mappedBy = "parent",
        cascade = [CascadeType.PERSIST, CascadeType.MERGE],
        fetch = FetchType.LAZY
    )
    private val children = mutableListOf<User>()

    @OneToMany(
        mappedBy = "user",
        cascade = [CascadeType.PERSIST, CascadeType.MERGE],
        fetch = FetchType.LAZY
    )
    private val operations = mutableListOf<Operation>()

    @Version
    private val version: Long = 0

    @Transient
    val childrenList = children.toList()

    fun addChild(child: User) {
        children.add(child)
        child.parent = this
    }

    fun removeChild(child: User) {
        children.remove(child)
        child.parent = null
    }

    fun addOperation(operation: Operation) {
        operations.add(operation)
        operation.user = this
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false
        other as User
        return id == other.id
    }

    override fun hashCode(): Int {
        return 31
    }


}

