package autoexpenses.dto;

import lombok.Data;

@Data
public class CategoryRequestDto {
    public Long id;
    public String nameCategory;
    public Long carId;
}
