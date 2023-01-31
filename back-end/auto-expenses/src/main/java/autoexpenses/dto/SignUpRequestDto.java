package autoexpenses.dto;

import lombok.Data;

@Data
public class SignUpRequestDto {
    public String login;
    public String fullName;
    public String email;
    public String password;
}
