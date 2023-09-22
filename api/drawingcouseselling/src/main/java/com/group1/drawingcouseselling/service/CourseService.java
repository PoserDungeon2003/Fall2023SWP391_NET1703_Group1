package com.group1.drawingcouseselling.service;

import com.group1.drawingcouseselling.exception.CourseNotFoundException;
import com.group1.drawingcouseselling.model.dto.CourseDto;

import java.math.BigDecimal;
import java.util.List;

public interface CourseService {
    public List<CourseDto> getAllCourseByPaging(Integer paging, Integer maxPage);
    public CourseDto searchCourseById(BigDecimal id) throws CourseNotFoundException;

    public CourseDto addCourse(CourseDto course);

    public List<CourseDto> searchCourseByNameAndFilter(String name, Integer page, Integer maxPage);
}
