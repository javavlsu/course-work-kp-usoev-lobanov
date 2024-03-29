package autoexpenses.repository;

import autoexpenses.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    SubCategory findByNameSubCategory(String name);
}
