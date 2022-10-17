package autoexpenses.service.impl;

import autoexpenses.dto.CategoryRequestDto;
import autoexpenses.dto.SubCategoryRequestDto;
import autoexpenses.entity.Category;
import autoexpenses.entity.SubCategory;
import autoexpenses.repository.CarRepository;
import autoexpenses.repository.CategoryRepository;
import autoexpenses.repository.SubCategoryRepository;
import autoexpenses.repository.UserRepository;
import autoexpenses.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository, UserRepository userRepository, CarRepository carRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
    }


    @Override
    public List<Category> getAll(Long id, Long carId) {
        val user = userRepository.findById(id).orElse(null);
        val car = carRepository.findById(carId).orElse(null);
        List<Category> result = categoryRepository.findAll()
                .stream()
                .filter(c -> Stream.of(Boolean.FALSE).anyMatch(s -> c.getDeleted().equals(s)))
                .filter(a -> Stream.of(user).anyMatch(b -> a.getUser().equals(b)))
                .filter(d -> Stream.of(car).anyMatch(e -> d.getCars().equals(e)))
                .collect(Collectors.toList());
        log.info("size list category", result.size());
        return result;
    }

    @Override
    public Category create(CategoryRequestDto dto) {
        if(categoryRepository.findByNameCategory(dto.nameCategory) != null) throw new RuntimeException("category already exist");

        val category = new Category();
        category.setNameCategory(dto.nameCategory);
        category.setDeleted(Boolean.FALSE);
        category.setUser(userRepository.findById(dto.id).orElse(null));
        category.setCars(carRepository.findById(dto.carId).orElse(null));
        categoryRepository.save(category);
        return category;
    }

    @Override
    public Category add(SubCategoryRequestDto dto) {
        if(categoryRepository.findByNameCategory(dto.nameCategory) != null){
            Category category = categoryRepository.findById(categoryRepository.findByNameCategory(dto.nameCategory).getId()).orElse(null);
            if(category == null) throw new RuntimeException("category not found");
            createSubCategory(dto.nameSubCategory, category);
            return category;
        }
        else {
            throw new RuntimeException("Category not found");
        }
    }

    private SubCategory createSubCategory(String nameSubCategory, Category category){
        val subcategory = new SubCategory();
        subcategory.setNameSubCategory(nameSubCategory);
        subcategory.setDeleted(Boolean.FALSE);
        subcategory.setCategory(category);
        subCategoryRepository.save(subcategory);
        return subcategory;
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteCategory(Long id) {
        if(categoryRepository.findById(id) != null) {
            val category = categoryRepository.findById(id).orElse(null);
            category.setDeleted(Boolean.TRUE);
            categoryRepository.save(category);
        }
    }

    @Override
    public void deleteSubCategory(Long id) {
        if (subCategoryRepository.findById(id) != null) {
            val subCategory = subCategoryRepository.findById(id).orElse(null);
            subCategory.setDeleted(Boolean.TRUE);
            subCategoryRepository.save(subCategory);
        }
    }
}
