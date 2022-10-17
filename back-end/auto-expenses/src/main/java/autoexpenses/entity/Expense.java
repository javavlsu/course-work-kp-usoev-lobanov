package autoexpenses.entity;

import autoexpenses.dto.ExpenseResponseDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "expense")
public class Expense extends ExpenseResponseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nameExpense")
    private String nameExpense;

    @Column(name = "description")
    private String description;

    @Column(name = "count")
    private int count;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "deleted")
    private Boolean deleted;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "subCategoryId")
    private SubCategory subCategory;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "carId")
    private Car cars;
}
