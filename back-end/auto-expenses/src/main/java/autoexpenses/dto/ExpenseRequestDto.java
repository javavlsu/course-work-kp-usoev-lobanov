package autoexpenses.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class ExpenseRequestDto {
    public String nameExpense;
    public String description;
    public int count;
    public Double amount;
    public Long categoryId;
    public Long subCategoryId;
    public Long carId;
}
