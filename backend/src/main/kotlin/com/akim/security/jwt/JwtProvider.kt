package com.akim.security.jwt

import io.jsonwebtoken.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import java.util.Date


@Component
class JwtProvider {

    @Value("\${assm.app.jwtSecret}")
    lateinit var jwtSecret: String

    @Value("\${assm.app.jwtExpiration}")
    var jwtExpiration: Long? = 0

    fun createToken(authentication: Authentication): String {
        val authorities = authentication.authorities
            .joinToString { grantedAuthority -> grantedAuthority.authority }
        val now = (Date()).time
        val validity = Date(now + jwtExpiration!! * 1000)
        return Jwts
            .builder()
            .setSubject(authentication.name)
            .claim(AUTHORITIES_KEY, authorities)
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .setExpiration(validity)
            .compact()
    }

    fun getAuthentication(token: String): Authentication {
        val claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).body

        val authorities = claims[AUTHORITIES_KEY]
            .toString()
            .split(",")
            .map { role -> SimpleGrantedAuthority(role) }
            .toCollection(ArrayList())

        val principal = User(claims.subject, "", authorities)

        return UsernamePasswordAuthenticationToken(principal, token, authorities)
    }

    fun validateJwtToken(authToken: String): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken)
            return true
        } catch (e: SignatureException) {
            logger.error("Invalid JWT signature -> Message: {} ", e)
        } catch (e: MalformedJwtException) {
            logger.error("Invalid JWT token -> Message: {}", e)
        } catch (e: ExpiredJwtException) {
            logger.error("Expired JWT token -> Message: {}", e)
        } catch (e: UnsupportedJwtException) {
            logger.error("Unsupported JWT token -> Message: {}", e)
        } catch (e: IllegalArgumentException) {
            logger.error("JWT claims string is empty -> Message: {}", e)
        }
        return false
    }

    companion object {
        private val logger = LoggerFactory.getLogger(JwtAuthTokenFilter::class.java)
        private const val AUTHORITIES_KEY = "auth"
    }
}
