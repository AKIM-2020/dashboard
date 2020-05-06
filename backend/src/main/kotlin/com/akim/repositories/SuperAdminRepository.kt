package com.akim.repositories

import com.akim.domain.SuperAdminEntity
import org.springframework.data.jpa.repository.JpaRepository

interface SuperAdminRepository : JpaRepository<SuperAdminEntity, Long>
