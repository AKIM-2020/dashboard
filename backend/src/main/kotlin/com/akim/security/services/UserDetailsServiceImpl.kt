package com.akim.security.services

import com.akim.security.repositories.RoleRepository
import com.akim.security.repositories.AuthUserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(
    private val authUserRepository: AuthUserRepository,
    private val roleRepository: RoleRepository
) : UserDetailsService {

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(userName: String): UserDetails {
        val user = authUserRepository.findByLogin(userName)
            ?: throw UsernameNotFoundException("User '$userName' not found")

        val authorities: List<GrantedAuthority> =
            user.roles!!
                .map { role -> SimpleGrantedAuthority(role.name.name) }
                .toCollection(ArrayList<GrantedAuthority>())
        return User
            .withUsername(userName)
            .password(user.password)
            .authorities(authorities)
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build()
    }

}
