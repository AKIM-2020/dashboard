package com.akim.exceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus
import javax.persistence.EntityNotFoundException

@ControllerAdvice
class ExceptionTranslator {

    @ExceptionHandler(AccessDeniedException::class, AuthenticationCredentialsNotFoundException::class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    fun processAccessDeniedException(ex: AccessDeniedException): Error {
        return Error(ex.localizedMessage)
    }

    @ExceptionHandler(EntityNotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    fun processEntityNotFoundException(ex: EntityNotFoundException): Error {
        return Error(ex.localizedMessage)
    }

    @ExceptionHandler(Exception::class)
    fun processRuntimeException(ex: Exception): ResponseEntity<Error> {
        val builder: ResponseEntity.BodyBuilder
        return if(ex is HasHttpCodeException) {
            val codeException = ex as HasHttpCodeException
            val code = codeException.getCode()
            builder = ResponseEntity.status(code)
            builder.body(Error(ex.localizedMessage))
        } else {
            builder = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            builder.body(Error(ex.localizedMessage ?: "Internal server error"))
        }
    }
}