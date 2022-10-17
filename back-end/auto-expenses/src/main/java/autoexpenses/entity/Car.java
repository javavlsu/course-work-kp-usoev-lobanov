package autoexpenses.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "generation")
    private String generation;

    @Column(name = "yearOfIssue")
    private String yearOfIssue;

    @Column(name = "winCode")
    private String winCode;

    @Column(name = "color")
    private String color;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "carParamId")
    private CarParam carParam;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "docId")
    private Document document;

    @ManyToMany(mappedBy = "cars", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<User> users;
}
