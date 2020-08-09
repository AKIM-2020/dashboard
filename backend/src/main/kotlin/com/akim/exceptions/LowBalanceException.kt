package com.akim.exceptions

import java.lang.RuntimeException

class LowBalanceException: RuntimeException, HasHttpCodeException {

    private val code = 400

    constructor(id: Long) : super("User [$id] doesn't have enough money to transfer")

    override fun getCode(): Int {
        return this.code
    }

}
