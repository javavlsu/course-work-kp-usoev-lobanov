package autoexpenses.service;

import autoexpenses.dto.ExpenseRequestDto;
import autoexpenses.dto.ExpenseResponseDto;
import autoexpenses.dto.StatisticExpenseDto;
import autoexpenses.entity.Expense;

import java.util.List;

public interface ExpenseService {
    List<Expense> getAllExpenseCategory(Long id, Long carId);

    List<Expense> getAllExpenseSubCategory(Long idCategory, Long idSubCategory, Long carId);

    Expense create(ExpenseRequestDto dto);

    Expense findById(Long id);

    void deleteExpense(Long id);

    StatisticExpenseDto getStatistic(Long id);
}
