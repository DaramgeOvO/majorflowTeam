package dw.majorflow.dto;

import dw.majorflow.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TeacherDto {
    private Long teacherId;
    private String teacherName;
    private String teacherImgPath;
}
