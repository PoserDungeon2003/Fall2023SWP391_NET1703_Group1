package com.group1.drawingcouseselling.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.group1.drawingcouseselling.model.entity.Account;
import com.group1.drawingcouseselling.model.enums.ERole;
import lombok.Builder;
import lombok.NonNull;

import java.sql.Date;
@Builder
public record AccountDto(@NonNull String email, @JsonIgnore String password, ERole role, Date createDate, Boolean isActive) {
    public AccountDto(String email, String password, ERole role, Date createDate, Boolean isActive) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.createDate = createDate;
        this.isActive = isActive;
    }
}
