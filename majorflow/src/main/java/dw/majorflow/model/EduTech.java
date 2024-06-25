package dw.majorflow.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "edu_tech")
public class EduTech {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int EduTechId;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Lecture lecture;

}
