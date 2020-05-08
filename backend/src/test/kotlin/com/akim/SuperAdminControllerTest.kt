package com.akim

import com.akim.dto.SuperAdminRequest
import com.akim.dto.Currency
import com.akim.repositories.SuperAdminRepository
import com.fasterxml.jackson.databind.ObjectMapper
import org.hamcrest.Matchers.hasSize
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal


@RunWith(SpringRunner::class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("db")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional(propagation = Propagation.NOT_SUPPORTED)
class SuperAdminControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var repository: SuperAdminRepository

    private val URL = "/api/v1/owner/super-admin"
    private val URL_WITH_ID = "/api/v1/owner/super-admin/{id}"

    private val mapper: ObjectMapper = ObjectMapper()


    @Test
    fun testCreate() {
        val saveRequest = SuperAdminRequest(
            "testLogin",
            "testPassword",
            "Test",
            "Testov",
            "Taraz",
            "test@email",
            Currency.USD
        )
        this.mockMvc.perform(post(URL)
            .content(mapper.writeValueAsString(saveRequest))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isAccepted)

        val persisted = repository.findAll()[0]

        val updateRequest = SuperAdminRequest(
            "testupdated",
            null,
            "Test",
            "Testov",
            "UpdateCity",
            null,
            null
        )

        this.mockMvc.perform(put(URL_WITH_ID, persisted.id)
            .content(mapper.writeValueAsString(updateRequest))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isAccepted)

        val updated = repository.findAll()[0]
        assertEquals(updateRequest.login, updated.user.login)
        assertEquals(updateRequest.city, updated.city)

        this.mockMvc.perform(get(URL)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.[0].id").value(updated.id.toString()))

        this.mockMvc.perform(delete(URL_WITH_ID, updated.id)
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isAccepted)

        assertTrue(repository.findAll().isEmpty())

    }






}
