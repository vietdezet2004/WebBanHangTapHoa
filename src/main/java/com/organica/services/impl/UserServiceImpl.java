package com.organica.services.impl;

import com.organica.config.JwtService;
import com.organica.entities.Cart;
import com.organica.entities.Role;
import com.organica.entities.TotalRoles;
import com.organica.entities.User;
import com.organica.payload.SignIn;
import com.organica.payload.SignInResponse;
import com.organica.payload.UserDto;
import com.organica.repositories.UserRepo;
import com.organica.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = this.modelMapper.map(userDto, User.class);

        // Đặt role mặc định là USER
        List<Role> list = new ArrayList<>();
        list.add(new Role(TotalRoles.USER.name()));
        user.setRole(list);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Cart cart = new Cart();
        cart.setUser(user);
        user.setCart(cart);

        this.userRepo.save(user);
        return this.modelMapper.map(user, UserDto.class);
    }

    @Override
    public SignInResponse signIn(SignIn signIn) {
        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signIn.getEmail(), signIn.getPassword())
        );

        User user = this.userRepo.findByEmail(signIn.getEmail());
        String jwtToken = jwtService.generateToken(user);

        String role = user.getRole() != null && !user.getRole().isEmpty()
                ? user.getRole().get(0).getRole()
                : "USER";

        return new SignInResponse(jwtToken, user.getEmail(), user.getName(), role);
    }
}
