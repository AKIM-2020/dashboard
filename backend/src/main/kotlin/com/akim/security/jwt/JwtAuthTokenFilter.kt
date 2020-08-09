package com.akim.security.jwt

import java.io.IOException

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.slf4j.LoggerFactory
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthTokenFilter(
    private val tokenProvider: JwtProvider
) : OncePerRequestFilter() {

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            val jwt = resolveToken(request)
            if (!jwt.isNullOrBlank() && tokenProvider.validateJwtToken(jwt)) {
                val authentication = tokenProvider.getAuthentication(jwt)
                SecurityContextHolder.getContext().authentication = authentication
            }
        } catch (e: Exception) {
            LOG.error("Can not set user authentication -> Message: {}", e)
        }

        filterChain.doFilter(request, response)
    }

    private fun resolveToken(request: HttpServletRequest): String? {
        val authHeader = request.getHeader(AUTHORIZATION_HEADER)
        return if (!authHeader.isNullOrBlank()) {
            authHeader.replace("Bearer ", "")
        } else null
    }

    companion object {
        private val LOG = LoggerFactory.getLogger(JwtAuthTokenFilter::class.java)
        private const val AUTHORIZATION_HEADER = "Authorization"
    }
}
