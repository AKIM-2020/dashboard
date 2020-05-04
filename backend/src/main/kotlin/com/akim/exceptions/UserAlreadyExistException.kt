package com.akim.exceptions

import java.lang.RuntimeException

class UserAlreadyExistException : RuntimeException {

    constructor() : super() {}

    constructor(message: String) : super(message) {}

}
