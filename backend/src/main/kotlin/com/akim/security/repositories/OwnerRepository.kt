package com.akim.security.repositories

import com.akim.domain.OwnerEntity
import org.springframework.data.jpa.repository.JpaRepository

interface OwnerRepository: JpaRepository<OwnerEntity, Long>
