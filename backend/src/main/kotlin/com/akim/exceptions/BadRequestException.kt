package com.akim.exceptions

import java.lang.RuntimeException

class BadRequestException: RuntimeException {

    constructor() : super() {}

    constructor(id: Long) : super("Wrong request")

}
