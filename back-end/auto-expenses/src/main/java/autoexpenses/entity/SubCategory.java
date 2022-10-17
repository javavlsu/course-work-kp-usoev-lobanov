package autoexpenses.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "subCategory")
public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nameSubCategory")
    private String nameSubCategory;

    @OneToMany(mappedBy = "subCategory", cascade = CascadeType.ALL)
    private List<Expense> expenses;

    @Column(name = "deleted")
    private Boolean deleted;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;
}
