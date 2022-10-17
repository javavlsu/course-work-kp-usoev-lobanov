package autoexpenses.service.impl;

import autoexpenses.dto.AuthenticationRequestDto;
import autoexpenses.dto.ChangePasswordRequest;
import autoexpenses.dto.SignUpRequestDto;
import autoexpenses.security.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import autoexpenses.entity.Status;
import autoexpenses.entity.User;
import autoexpenses.repository.UserRepository;
import autoexpenses.service.UserService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    @Lazy
    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public User register(SignUpRequestDto dto, String token) {

        val user = new User();
        user.setCreated(new Date());
        user.setStatus(Status.ACTIVE);
        user.setToken(token);
        user.setLogin(dto.login);
        user.setFullName(dto.fullName);
        user.setEmail(dto.email);
        user.setPassword(passwordEncoder.encode(dto.password));

        User registeredUser = userRepository.save(user);

        log.info("IN register - user: {} successfully registered", registeredUser);

        return registeredUser;
    }

    @Override
    public User login(AuthenticationRequestDto authenticationRequestDto, String token) {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequestDto.getLogin(), authenticationRequestDto.getPassword()));
            val user = userRepository.findByLogin(authenticationRequestDto.getLogin());

            if (user == null) {
                throw new UsernameNotFoundException("User with username: " + authenticationRequestDto.getLogin() + " not found");
            }

            user.setToken(token);
            userRepository.save(user);

            return user;

    }

    @Override
    public User changePassword(ChangePasswordRequest changePasswordRequest) {
        val user = userRepository.findById(changePasswordRequest.id).orElse(null);
        user.setPassword(passwordEncoder.encode(changePasswordRequest.password));
        //user.setToken(jwtTokenProvider.createToken(user.getLogin()));
        userRepository.save(user);

        return user;
    }

    @Override
    public List<User> getAll() {
        List<User> result = userRepository.findAll();
        log.info("IN getAll - {} users found", result.size());
        return result;
    }

    @Override
    public User findByLogin(String login) {
        User result = userRepository.findByLogin(login);
        log.info("IN findByUsername - user: {} found by username: {}", result, login);
        return result;
    }

    @Override
    public User findById(Long id) {
        User result = userRepository.findById(id).orElse(null);

        if (result == null) {
            log.warn("IN findById - no user found by id: {}", id);
            return null;
        }

        log.info("IN findById - user: {} found by id: {}", result);
        return result;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
        log.info("IN delete - user with id: {} successfully deleted");
    }
}
