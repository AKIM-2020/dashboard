package com.akim.domain

import com.akim.dto.Roles
import com.akim.security.domain.User
import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "owners")
class OwnerEntity(

    val balance: BigDecimal,

    @OneToOne(cascade = [CascadeType.ALL], optional = false)
    @JoinColumn(name = "user_id")
    val user: User

) {

    @Id
    val id: Long = 0

    @OneToMany(mappedBy = "owner", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    private val superAdmins = mutableListOf<SuperAdminEntity>()

    @Transient
    val superAdminsList = superAdmins.toList()

    fun addSuperAdmin(superAdmin: SuperAdminEntity) {
        superAdmins.add(superAdmin)
        superAdmin.owner = this
    }

    fun removeAdmin(superAdmin: SuperAdminEntity) {
        superAdmins.remove(superAdmin)
        superAdmin.owner = null
    }

}
