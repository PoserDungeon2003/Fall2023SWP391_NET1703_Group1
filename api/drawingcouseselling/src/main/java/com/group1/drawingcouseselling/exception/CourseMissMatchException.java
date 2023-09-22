package com.group1.drawingcouseselling.exception;

import com.group1.drawingcouseselling.model.dto.ErrorMessage;
import org.springframework.http.HttpStatus;

import java.util.List;

public class CourseMissMatchException extends BaseException{
    public CourseMissMatchException(String message) {
        super(message);
        this.errorMessage = ErrorMessage.builder()
                .status(HttpStatus.NOT_FOUND)
                .errorList(List.of(message))
                .build();
    }
}
