package com.akim.security.mappers

import com.akim.dto.Roles
import com.akim.security.domain.Role
import com.akim.security.domain.User
import com.akim.security.dto.NewUser
import com.akim.security.repositories.RoleRepository
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.mapstruct.Named
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Mapper(componentModel = "spring")
abstract class UserMapper {

    @Autowired
    protected lateinit var  roleRepository: RoleRepository
    @Autowired
    protected lateinit var passwordEncoder: BCryptPasswordEncoder

    @Mappings(
        Mapping(target = "id", ignore = true),
        Mapping(target = "password", source = "source.password", qualifiedByName = ["encodePassword"]),
        Mapping(target = "roles", source = "source.role", qualifiedByName = ["getRoles"])
    )
    abstract fun newUserToUser(source: NewUser): User

    @Named("encodePassword")
    protected fun encodePassword(password: String): String {
        return passwordEncoder.encode(password)
    }

    @Named("getRoles")
    protected fun getRoles(role: Roles): List<Role> {
        return listOf(roleRepository.findByName(role))
    }

}
