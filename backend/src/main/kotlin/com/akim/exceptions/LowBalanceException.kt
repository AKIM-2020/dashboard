package com.akim.exceptions

import java.lang.RuntimeException

class LowBalanceException: RuntimeException {

    constructor() : super() {}

    constructor(id: Long) : super("User [$id] doesn't have enough money to transfer") {}

}
