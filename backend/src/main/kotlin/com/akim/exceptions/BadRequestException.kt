package com.akim.exceptions

class BadRequestException(message: String) : RuntimeException(message), HasHttpCodeException {

    private val code = 400

    override fun getCode(): Int {
        return this.code
    }

}
