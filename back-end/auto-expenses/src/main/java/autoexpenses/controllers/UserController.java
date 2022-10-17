package autoexpenses.controllers;

import autoexpenses.dto.AuthenticationRequestDto;
import autoexpenses.dto.SignUpRequestDto;
import autoexpenses.dto.UserDto;
import autoexpenses.entity.User;
import autoexpenses.security.jwt.JwtTokenProvider;
import autoexpenses.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/")
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("signup")
    public ResponseEntity signup(@RequestBody SignUpRequestDto signUp){
        String token = jwtTokenProvider.createToken(signUp.getLogin());
        User user = userService.register(signUp, token);

        if(user == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        UserDto result = UserDto.fromUser(user);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("signin")
    public ResponseEntity signin(@RequestBody AuthenticationRequestDto requestDto) {
        try {
            String token = jwtTokenProvider.createToken(requestDto.getLogin());
            User user = userService.login(requestDto, token);

            if(user == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return ResponseEntity.ok(user);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid login or password");
        }
    }

    @GetMapping(value = "getUser")
    public ResponseEntity<UserDto> getUserById(@RequestParam final Long id){
        User user = userService.findById(id);

        if(user == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        UserDto result = UserDto.fromUser(user);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
