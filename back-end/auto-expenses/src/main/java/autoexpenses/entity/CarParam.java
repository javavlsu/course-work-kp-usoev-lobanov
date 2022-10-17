package autoexpenses.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "carParam")
public class CarParam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "body")
    private String body;

    @Column(name = "typeEngine")
    private String engine;

    @Column(name = "engineCapacity")
    private String engineCapacity;

    @Column(name = "power")
    private String power;

    @Column(name = "mileage")
    private double mileage;

    @Column(name = "kpp")
    private String kpp;

    @Column(name = "driveUnit")
    private String driveUnit;

    @Column(name = "steeringWheelPosition")
    private String steeringWheelPosition;

    @Column(name = "consumption")
    private double consumption;

    @Column(name = "deleted")
    private Boolean deleted;
}
