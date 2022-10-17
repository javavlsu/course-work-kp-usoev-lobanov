package autoexpenses.service;

import autoexpenses.dto.CategoryRequestDto;
import autoexpenses.dto.SubCategoryRequestDto;
import autoexpenses.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll(Long id, Long carId);

    Category create(CategoryRequestDto dto);

    Category add(SubCategoryRequestDto dto);

    Category findById(Long id);

    void deleteCategory(Long id);

    void deleteSubCategory(Long id);
}
