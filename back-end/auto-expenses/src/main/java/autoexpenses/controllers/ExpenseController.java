package autoexpenses.controllers;

import autoexpenses.dto.ExpenseRequestDto;
import autoexpenses.dto.ExpenseResponseDto;
import autoexpenses.entity.Expense;
import autoexpenses.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/")
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("createExpense")
    public ResponseEntity create(@RequestBody final ExpenseRequestDto expenseRequestDto) {
        Expense expense = expenseService.create(expenseRequestDto);

        if(expense == null) return new ResponseEntity(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(expense);
    }

    @GetMapping("getAllExpensesCategory")
    public ResponseEntity<List<Expense>> getAll(@RequestParam final Long id, @RequestParam final Long carId){
        List<Expense> expenses = expenseService.getAllExpenseCategory(id, carId);

        if(expenses == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(expenses);
    }

    @GetMapping("getAllExpensesSubCategory")
    public ResponseEntity<List<Expense>> getAll(@RequestParam final Long idCategory, @RequestParam final Long idSubCategory, @RequestParam final Long carId){
        List<Expense> expenses = expenseService.getAllExpenseSubCategory(idCategory, idSubCategory, carId);

        if(expenses == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(expenses);
    }

    @GetMapping("getExpense")
    public ResponseEntity getById(@RequestParam final Long id) {
        Expense expense = expenseService.findById(id);

        if(expense == null) return new ResponseEntity(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(expense);
    }

    @GetMapping("deleteExpense")
    public ResponseEntity deleteExpense (@RequestParam final Long id){
        expenseService.deleteExpense(id);

        return ResponseEntity.ok("expense deleted");
    }
}
