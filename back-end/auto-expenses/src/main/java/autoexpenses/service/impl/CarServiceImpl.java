package autoexpenses.service.impl;

import autoexpenses.dto.CarRequestDto;
import autoexpenses.entity.Car;
import autoexpenses.entity.CarParam;
import autoexpenses.entity.Document;
import autoexpenses.entity.User;
import autoexpenses.repository.CarParamRepositrory;
import autoexpenses.repository.CarRepository;
import autoexpenses.repository.DocumentRepostirory;
import autoexpenses.repository.UserRepository;
import autoexpenses.service.CarService;
import lombok.val;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final CarParamRepositrory carParamRepositrory;
    private final DocumentRepostirory documentRepostirory;
    private final UserRepository userRepository;

    public CarServiceImpl(CarRepository carRepository, CarParamRepositrory carParamRepositrory, DocumentRepostirory documentRepostirory, UserRepository userRepository) {
        this.carRepository = carRepository;
        this.carParamRepositrory = carParamRepositrory;
        this.documentRepostirory = documentRepostirory;
        this.userRepository = userRepository;
    }

    @Override
    public List<Car> getAll(Long id) {
        val user = userRepository.findById(id).orElse(null);
        List<Car> result = carRepository.findAll()
                .stream()
                .filter(a -> a.getUsers().contains(user))
                .filter(c -> Stream.of(Boolean.FALSE).anyMatch(s -> c.getDeleted().equals(s)))
                .collect(Collectors.toList());
        log.info("size list car", result.size());
        return result;
    }

    @Override
    public Car add(CarRequestDto dto) {
        val docs = new Document();
        docs.setPtsSeries(dto.ptsSeries);
        docs.setPtsNumber(dto.ptsNumber);
        docs.setStsSeries(dto.stsSeries);
        docs.setStsNumber(dto.stsNumber);
        docs.setDeleted(Boolean.FALSE);
        documentRepostirory.save(docs);

        val carParameters = new CarParam();
        carParameters.setBody(dto.body);
        carParameters.setEngine(dto.engine);
        carParameters.setEngineCapacity(dto.engineCapacity);
        carParameters.setPower(dto.power);
        carParameters.setMileage(dto.mileage);
        carParameters.setKpp(dto.kpp);
        carParameters.setDriveUnit(dto.driveUnit);
        carParameters.setSteeringWheelPosition(dto.steeringWheelPosition);
        carParameters.setConsumption(dto.consumption);
        carParameters.setDeleted(Boolean.FALSE);
        carParamRepositrory.save(carParameters);

        val car = new Car();
        List<User> users = userRepository.findAll()
                .stream()
                //.filter(a -> Stream.of(car).anyMatch(b -> a.getCars().equals(b)))
                .distinct()
                .collect(Collectors.toList());
        car.setUsers(users);
        car.setBrand(dto.brand);
        car.setModel(dto.model);
        car.setGeneration(dto.generation);
        car.setYearOfIssue(dto.yearOfIssue);
        car.setWinCode(dto.winCode);
        car.setColor(dto.color);
        car.setDeleted(Boolean.FALSE);
        car.setCarParam(carParameters);
        car.setDocument(docs);
        carRepository.save(car);
        val user = userRepository.findById(dto.idUser).orElse(null);
        List<Car> cars = carRepository.findAll()
                .stream()
                .filter(a -> a.getUsers().contains(user))
                .collect(Collectors.toList());


        user.setCars(cars);
        userRepository.save(user);

        return car;
    }

    @Override
    public Car findById(Long id) {
        Car result = carRepository.findById(id).orElse(null);
        if (result == null) {
            log.warn("IN findById - no car found by id: {}", id);
            return null;
        }

        log.info("IN findById - car: {} found by id: {}", result);
        return result;
    }

    @Override
    public void deleteCar(Long id) {
        val car = carRepository.findById(id).orElse(null);
        if(car == null) throw new RuntimeException("error delete car");
        car.setDeleted(Boolean.TRUE);
        carRepository.save(car);
        val param = carParamRepositrory.findById(car.getCarParam().getId()).orElse(null);
        param.setDeleted(Boolean.TRUE);
        carParamRepositrory.save(param);
        val docs = documentRepostirory.findById(car.getDocument().getId()).orElse(null);
        docs.setDeleted(Boolean.TRUE);
        documentRepostirory.save(docs);
        log.info("deleted car: ", car);
    }
}
