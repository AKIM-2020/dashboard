package com.akim.controllers

import com.akim.security.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class BackendController() {

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/usercontent")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @ResponseBody
    fun getUserContent(authentication: Authentication): String {
        val user = userRepository.findByUserName(authentication.name)
        println("kostya_changes")
        return "Hello " + user?.firstName + " " + user?.lastName + "!"
    }


    @GetMapping("/admincontent")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    fun getAdminContent(): String {
        return "Admin's content"
    }

}