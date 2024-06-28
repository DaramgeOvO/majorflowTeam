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
@Table(name = "lecture")
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long lectureId;

    @Column(name = "lecture_name")
    private String lectureName;

    @Column(name = "lecture_image")
    private String lectureImage;

    @Column(name = "video_path")
    private String videoPath;

    @Column
    private String category;

    @Column(name = "lecture_course")
    private String lectureCourse;

    @Column
    private int price;

    @Column
    private String thumbnailImg;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Column
    private String lectureClass;
}

