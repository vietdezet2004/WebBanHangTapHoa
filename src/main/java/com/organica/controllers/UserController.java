package com.organica.controllers;

import com.organica.payload.SignIn;
import com.organica.payload.SignInResponse;
import com.organica.payload.UserDto;
import com.organica.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto createdUser = this.userService.createUser(userDto);
        return new ResponseEntity<>(createdUser, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponse> signIn(@RequestBody SignIn signIn) {
        SignInResponse signInResponse = this.userService.signIn(signIn);
        return new ResponseEntity<>(signInResponse, HttpStatusCode.valueOf(200));
    }
}
