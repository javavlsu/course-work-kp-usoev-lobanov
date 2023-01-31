package autoexpenses.service;

import autoexpenses.dto.AuthenticationRequestDto;
import autoexpenses.dto.ChangePasswordRequest;
import autoexpenses.dto.SignUpRequestDto;
import autoexpenses.entity.User;

import java.util.List;

public interface UserService {

    User register(SignUpRequestDto user, String token);

    User login(AuthenticationRequestDto authenticationRequestDto, String token);

    User changePassword(ChangePasswordRequest changePasswordRequest);

    List<User> getAll();

    User findByLogin(String login);

    User findById(Long id);

    void delete(Long id);
}
