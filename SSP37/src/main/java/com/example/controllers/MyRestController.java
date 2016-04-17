package com.example.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    // Add
    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
}
