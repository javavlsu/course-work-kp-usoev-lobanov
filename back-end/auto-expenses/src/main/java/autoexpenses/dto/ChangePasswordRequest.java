package autoexpenses.dto;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    public Long id;
    public String password;
}
