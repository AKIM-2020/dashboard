package com.akim.security

import com.akim.security.dto.JwtResponse
import com.akim.security.dto.LoginUser
import com.akim.security.dto.ResponseMessage
import com.akim.security.jwt.JwtProvider
import com.akim.security.repositories.UserRepository
import javax.validation.Valid
import java.util.stream.Collectors

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/auth")
class AuthController(
    var authenticationManagerBuilder: AuthenticationManagerBuilder,
    var userRepository: UserRepository,
    var jwtProvider: JwtProvider
) {

    @PostMapping("/signin")
    fun authenticateUser(@Valid @RequestBody loginRequest: LoginUser): ResponseEntity<*> {
        val user = userRepository.findByLogin(loginRequest.login)
        return if (user != null) {
            val authenticationToken = UsernamePasswordAuthenticationToken(loginRequest.login, loginRequest.password)
            val authentication = authenticationManagerBuilder.`object`.authenticate(authenticationToken)
            SecurityContextHolder.getContext().authentication = authentication

            val jwt = jwtProvider.createToken(authentication)

            val authorities: List<GrantedAuthority> = user.roles!!.stream()
                .map { role -> SimpleGrantedAuthority(role.name.name) }
                .collect(Collectors.toList<GrantedAuthority>())
            ResponseEntity.ok(JwtResponse(jwt, user.login, authorities))
        } else {
            ResponseEntity(ResponseMessage("User not found!"), HttpStatus.BAD_REQUEST)
        }
    }
}
