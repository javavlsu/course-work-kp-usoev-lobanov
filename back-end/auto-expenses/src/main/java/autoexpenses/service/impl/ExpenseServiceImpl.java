package autoexpenses.service.impl;

import autoexpenses.dto.ExpenseRequestDto;
import autoexpenses.entity.Expense;
import autoexpenses.repository.*;
import autoexpenses.service.ExpenseService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository, CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository, UserRepository userRepository, CarRepository carRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
    }

    @Override
    public List<Expense> getAllExpenseCategory(Long id, Long carId) {
        val category = categoryRepository.findById(id).orElse(null);
        val car = carRepository.findById(carId).orElse(null);
        List<Expense> result = expenseRepository.findAll()
                .stream()
                .filter(a -> Stream.of(Boolean.FALSE).anyMatch(b -> a.getDeleted().equals(b)))
                .filter(b -> Objects.isNull(b.getSubCategory()))
                .filter(c -> Stream.of(category).anyMatch(d -> c.getCategory().equals(d)))
                .filter(e -> Stream.of(car).anyMatch(f -> e.getCars().equals(f)))
                .collect(Collectors.toList());
        log.info("size list expense", result.size());

        return result;
    }

    @Override
    public List<Expense> getAllExpenseSubCategory(Long idCategory, Long idSubCategory, Long carId) {
        val subCategory = subCategoryRepository.findById(idSubCategory).orElse(null);
        val car = carRepository.findById(carId).orElse(null);

        List<Expense> result = expenseRepository.findAll()
                .stream()
                .filter(a -> Objects.nonNull(a.getSubCategory()))
                .filter(c -> Stream.of(subCategory).anyMatch(d -> c.getSubCategory().equals(d)))
                .filter(e -> Stream.of(Boolean.FALSE).anyMatch(f -> e.getDeleted().equals(f)))
                .filter(g -> Stream.of(car).anyMatch(h -> g.getCars().equals(h)))
                .collect(Collectors.toList());
        log.info("size list expence", result.size());
        return result;
    }

    @Override
    public Expense create(ExpenseRequestDto dto) {
        val expense = new Expense();
        expense.setNameExpense(dto.nameExpense);
        expense.setDescription(dto.description);
        expense.setCount(dto.count);
        expense.setAmount(dto.amount);
        expense.setCategory(categoryRepository.findById(dto.categoryId).orElse(null));
        expense.setCategoryId(dto.categoryId);
        expense.setSubCategory(subCategoryRepository.findById(dto.subCategoryId).orElse(null));
        expense.setSubCategoryId(dto.subCategoryId);

        expense.setCars(carRepository.findById(dto.carId).orElse(null));
        expense.setDeleted(Boolean.FALSE);
        expenseRepository.save(expense);

        return expense;
    }

    @Override
    public Expense findById(Long id) {
        Expense result = expenseRepository.findById(id).orElse(null);
        if(result == null) {
            log.warn("expense not found");
            return null;
        }
        log.info("expense by id: ", result);
        return result;
    }

    @Override
    public void deleteExpense(Long id) {
        val expense = expenseRepository.findById(id).orElse(null);
        expense.setDeleted(Boolean.TRUE);
        expenseRepository.save(expense);
    }

}
