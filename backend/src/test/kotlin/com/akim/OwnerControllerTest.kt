package com.akim

import com.akim.dto.CreateSuperAdminRequest
import com.akim.dto.Currency
import com.akim.security.services.UserService
import com.akim.services.OwnerService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.context.annotation.Import
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post

@DataJpaTest
@ActiveProfiles("db")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(value = [
    OwnerService::class,
    UserService::class
]
)
@AutoConfigureMockMvc
@RunWith(SpringRunner::class)
class OwnerControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    private val URL = "/api/v1/owner/super-admin"

    private val mapper: ObjectMapper = ObjectMapper()


    @Test
    fun testCreate() {

        val request = CreateSuperAdminRequest(
            "testLogin",
            "testPassword",
            "Test",
            "Testov",
            "Taraz",
            Currency.USD
        )



        this.mockMvc.perform(post(URL)
            .content(mapper.writeValueAsString(request))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
    }


}
