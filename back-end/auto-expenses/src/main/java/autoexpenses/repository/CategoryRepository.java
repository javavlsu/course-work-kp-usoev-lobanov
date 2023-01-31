package autoexpenses.repository;

import autoexpenses.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByNameCategory(String name);
}
