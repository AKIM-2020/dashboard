package com.akim.services

import com.akim.domain.SuperAdminEntity
import com.akim.dto.AdminDto
import com.akim.repositories.SuperAdminRepository
import com.akim.dto.SuperAdminRequest
import com.akim.dto.Roles
import com.akim.security.dto.NewUser
import com.akim.repositories.OwnerRepository
import com.akim.security.services.UserService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal

@Service
@Transactional
class SuperAdminService(
    private val superAdminRepository: SuperAdminRepository,
    private val userService: UserService,
    private val passwordEncoder: BCryptPasswordEncoder,
    private val ownerRepository: OwnerRepository
) {
    fun createSuperAdmin(request: SuperAdminRequest) {

        var user = request.let {
            NewUser(
                login = it.login!!,
                role = Roles.SUPER_ADMIN,
                password = it.password!!,
                email = it.email!!
            )
        }.let(userService::createUser)

        request.let {
            SuperAdminEntity(
                firstName = it.firstName!!,
                lastName = it.lastName!!,
                city = it.city!!,
                user = user,
                balance = BigDecimal.ZERO,
                currency = it.currency!!
            )
        }.let(::addNewSuperAdmin)
    }

    fun updateSuperAdmin(id: Long, request: SuperAdminRequest): Unit? {

        var superAdmin = superAdminRepository.getOne(id) ?: return null

        request.firstName?.let {
            superAdmin.firstName = it
        }
        request.lastName?.let {

            superAdmin.lastName = it
        }
        request.city?.let {
            superAdmin.city = it
        }
        request.login?.let {
            superAdmin.user.login = it
        }
        request.password?.let {
            superAdmin.user.password = passwordEncoder.encode(it)
        }
        request.email?.let {
            superAdmin.user.email = it
        }
        superAdminRepository.save(superAdmin)
        return Unit
    }

    fun deleteSuperAdmin(id: Long) = superAdminRepository.deleteById(id)

    fun getSuperAdmins(): List<AdminDto> =
        superAdminRepository.findAll()
            .map { it.toSuperAdminDto() }
            .toCollection(arrayListOf())

    private fun SuperAdminEntity.toSuperAdminDto(): AdminDto {
        return AdminDto(
            id = id,
            login = user.login,
            name = firstName,
            surname = lastName,
            city = city,
            balance = balance,
            role = Roles.SUPER_ADMIN
        )
    }

    private fun addNewSuperAdmin(superAdmin: SuperAdminEntity) {
        val owner = ownerRepository.findAll()[0]
        owner.addSuperAdmin(superAdmin)
        ownerRepository.save(owner)
    }


}
