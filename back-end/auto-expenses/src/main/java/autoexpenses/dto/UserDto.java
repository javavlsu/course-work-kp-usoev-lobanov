package autoexpenses.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import autoexpenses.entity.User;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {
    private Long id;
    private String login;
    private String fullName;
    private String email;

    public User toUser(){
        User user = new User();
        user.setId(id);
        user.setLogin(login);
        user.setFullName(fullName);
        user.setEmail(email);

        return user;
    }

    public static UserDto fromUser(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setLogin(user.getLogin());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());

        return userDto;
    }
}
