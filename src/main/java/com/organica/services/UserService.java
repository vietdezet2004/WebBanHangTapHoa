package com.organica.services;

import com.organica.payload.SignIn;
import com.organica.payload.SignInResponse;
import com.organica.payload.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);
    SignInResponse signIn(SignIn signIn);
}
