package autoexpenses.controllers;

import autoexpenses.dto.CategoryRequestDto;
import autoexpenses.dto.SubCategoryRequestDto;
import autoexpenses.entity.Category;
import autoexpenses.entity.SubCategory;
import autoexpenses.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping(value = "/api/")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("create")
    public ResponseEntity create (@RequestBody final CategoryRequestDto categoryRequestDto){
        Category category = categoryService.create(categoryRequestDto);

        if(category == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(category);
    }

    @PostMapping("add")
    public ResponseEntity add (@RequestBody final SubCategoryRequestDto subCategoryRequestDto){
        Category subCategory = categoryService.add(subCategoryRequestDto);

        if(subCategory == null) return new ResponseEntity(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(subCategory);
    }

    @GetMapping("getAllCategory")
    public ResponseEntity<List<Category>> getAll(@RequestParam final Long id, @RequestParam final Long carId) {
        List<Category> categories = categoryService.getAll(id, carId);

        if(categories == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(categories);
    }

    @GetMapping("getCategory")
    public ResponseEntity getById(@RequestParam final Long id){
        Category category = categoryService.findById(id);

        if(category == null) return new ResponseEntity(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(category);
    }

    @GetMapping("deleteCategory")
    public ResponseEntity delete(@RequestParam final Long id){
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("category deleted");
    }

    @GetMapping("deleteSubCategory")
    public ResponseEntity deleteSubCategory(@RequestParam final Long id){
        categoryService.deleteSubCategory(id);
        return ResponseEntity.ok("category deleted");
    }
}
