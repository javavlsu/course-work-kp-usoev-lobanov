package autoexpenses.dto;

import lombok.Data;

@Data
public class CarRequestDto {
    public Long idUser;
    public String brand;
    public String model;
    public String generation;
    public String yearOfIssue;
    public String winCode;
    public String color;

    public String body;
    public String engine;
    public String engineCapacity;
    public String power;
    public double mileage;
    public String kpp;
    public String driveUnit;
    public String steeringWheelPosition;
    public double consumption;

    public String ptsSeries;
    public String ptsNumber;
    public String stsSeries;
    public String stsNumber;
}
