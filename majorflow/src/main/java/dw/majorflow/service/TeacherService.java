package dw.majorflow.service;

import dw.majorflow.model.Teacher;
import dw.majorflow.model.User;
import dw.majorflow.dto.TeacherDto;
import dw.majorflow.exception.ResourceNotFoundException;
import dw.majorflow.model.Teacher;
import dw.majorflow.repository.TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherService {

    @Autowired
    TeacherRepository teacherRepository;

    // 모든 강사 다 받아오는 코드
    public List<Teacher> getAllTeacher() {
        return teacherRepository.findAll();
    }

    // 강사Id를 받아와서 강사Id와 강사이름을 출력하는 코드
    public TeacherDto getTeacherById(Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            return toDto(teacher.get());

        } else {
            throw new RuntimeException("Teacher not found with id: " + id);
        }
    }

    // 강사엔티티에서 불필요한 정보는 제외하고 강사Id와 강사이름만 DTO 에 담는 코드
    private TeacherDto toDto(Teacher teacher) {
        TeacherDto dto = new TeacherDto();
        dto.setTeacherId(teacher.getTeacherId());
        dto.setTeacherName(teacher.getTeacherName());
        dto.setTeacherImgPath(teacher.getTeacherImgPath());
        return dto;
    }
}
