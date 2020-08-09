package com.akim.config

import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders.AUTHORIZATION
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.service.ApiKey
import springfox.documentation.service.SecurityReference
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import io.swagger.models.auth.In.HEADER
import org.springframework.context.annotation.Bean
import springfox.documentation.service.AuthorizationScope
import springfox.documentation.spi.service.contexts.SecurityContext
import springfox.documentation.swagger2.annotations.EnableSwagger2


@Configuration
@EnableSwagger2
class SwaggerConfiguration {

    @Bean
    fun api(): Docket = Docket(DocumentationType.SWAGGER_2)
        .securitySchemes(listOf(ApiKey("JWT", AUTHORIZATION, HEADER.name)))
        .securityContexts(securityContext)
        .select()
        .apis(RequestHandlerSelectors.any())
        .paths(PathSelectors.any())
        .build()

    private val securityContext = listOf(
        SecurityContext.builder()
            .securityReferences(
                listOf(SecurityReference.builder()
                    .reference("JWT")
                    .scopes(arrayOf(AuthorizationScope("global", "accessEverything")))
                    .build()
                )
            ).build()
    )

}
