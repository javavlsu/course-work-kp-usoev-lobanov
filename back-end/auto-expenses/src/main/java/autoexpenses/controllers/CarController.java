package autoexpenses.controllers;

import autoexpenses.dto.CarRequestDto;
import autoexpenses.entity.Car;
import autoexpenses.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping(value = "/api/")
public class CarController {

    private  final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("addCar")
    public ResponseEntity addCar(@RequestBody final CarRequestDto carRequestDto){
        Car car = carService.add(carRequestDto);
        if(car == null) return new ResponseEntity(HttpStatus.NO_CONTENT);

        return  ResponseEntity.ok(car);
    }

    @GetMapping("getAllCars")
    public ResponseEntity<List<Car>> getAllCars(@RequestParam final Long id) {
        List<Car> cars = carService.getAll(id);
        if(cars == null) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(cars);
    }

    @GetMapping("getCar")
    public ResponseEntity getById(@RequestParam final Long id){
        Car car = carService.findById(id);
        if(car == null) return new ResponseEntity(HttpStatus.NO_CONTENT);

        return ResponseEntity.ok(car);
    }

    @GetMapping("deleteCar")
    public ResponseEntity deleteCar (@RequestParam final Long id){
        carService.deleteCar(id);
        return ResponseEntity.ok("car deleted");
    }
}
