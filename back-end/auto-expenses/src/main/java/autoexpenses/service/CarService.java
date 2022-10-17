package autoexpenses.service;

import autoexpenses.dto.CarRequestDto;
import autoexpenses.entity.Car;

import java.util.List;

public interface CarService {
    List<Car> getAll(Long id);

    Car add(CarRequestDto car);

    Car findById(Long id);

    void deleteCar(Long id);
}
