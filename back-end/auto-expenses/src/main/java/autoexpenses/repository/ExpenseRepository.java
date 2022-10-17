package autoexpenses.repository;

import autoexpenses.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    //Expense findByName(String name);
}
