package autoexpenses.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ptsSeries")
    private String ptsSeries;

    @Column(name = "ptsNumber")
    private String ptsNumber;

    @Column(name = "stsSeries")
    private String stsSeries;

    @Column(name = "stsNumber")
    private String stsNumber;

    @Column(name = "deleted")
    private Boolean deleted;
}
