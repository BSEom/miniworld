package com.pknu.miniworld.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
@RequestMapping("/api")
@Tag(name = "Test", description = "Swagger 작동 테스트")
public class test {

    @GetMapping("/")
    @Operation(summary = "test 기능")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

}
