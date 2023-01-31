package autoexpenses.dto;

import lombok.Data;

@Data
public class ExpenseResponseDto {
    private Long id;
    private String nameExpense;
    private String description;
    private int count;
    private Double amount;
    private Long categoryId;
    private Long subCategoryId;
    private Boolean deleted;
}
