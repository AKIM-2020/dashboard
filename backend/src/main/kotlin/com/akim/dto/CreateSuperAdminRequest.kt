package com.akim.dto

import com.github.pozo.KotlinBuilder


data class CreateSuperAdminRequest(
    var login: String,
    var password: String,
    var name: String,
    var surname: String,
    var city: String,
    var currency: Currency
)
