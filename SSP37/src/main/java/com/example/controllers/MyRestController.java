package com.example.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;                     // Add
import org.springframework.http.ResponseEntity;                 // Add
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;    // Add
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyRestController {

	@RequestMapping("/hello")
	public Map<String,Object> hello() {
	    Map<String,Object> model = new HashMap<String,Object>();
	    model.put("id", UUID.randomUUID().toString());
	    model.put("text", "Hello by MyRestController");
	    return model;
	}
	
    // Add
    @RequestMapping("/helloOrBad")
    public ResponseEntity<Map<String,Object>> helloOrBad(@RequestParam(required=false) Boolean bad) {
        if(bad != null && bad) {
            return new ResponseEntity<Map<String,Object>>(HttpStatus.BAD_REQUEST);
        }
        else {
            Map<String,Object> model = new HashMap<String,Object>();
            model.put("id", UUID.randomUUID().toString());
            model.put("text", "Hello or Bad by MyRestController");
            return new ResponseEntity<Map<String,Object>>(model, HttpStatus.OK);
        }
    }
}
