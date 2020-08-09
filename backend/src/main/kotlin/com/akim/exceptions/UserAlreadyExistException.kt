package com.akim.exceptions

import java.lang.RuntimeException

class UserAlreadyExistException : RuntimeException, HasHttpCodeException {

    private val code = 400

    constructor(message: String) : super(message)

    override fun getCode(): Int {
        return this.code
    }

}
