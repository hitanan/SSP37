package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;				// Add
import org.springframework.web.bind.annotation.RequestMapping;	// Add
import org.springframework.web.bind.annotation.ResponseBody;	// Add

@SpringBootApplication
@Controller														// Add
public class Ssp37Application {

	public static void main(String[] args) {
		SpringApplication.run(Ssp37Application.class, args);
	}

	// Add
	@RequestMapping("/")
	@ResponseBody
	public String hello() {
		return "hello";
		
	}
}
