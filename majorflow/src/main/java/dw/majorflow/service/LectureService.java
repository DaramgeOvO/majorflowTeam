package dw.majorflow.service;

import dw.majorflow.exception.ResourceNotFoundException;
import dw.majorflow.model.Lecture;
import dw.majorflow.repository.LectureRepository;
import dw.majorflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class LectureService {

    @Autowired
    LectureRepository lectureRepository;

    public List<Lecture> getAllLectures() {
        return lectureRepository.findAll();
    }

    public Lecture getLectureById(long id) {
        Optional<Lecture> lectureOptional = lectureRepository.findById(id);
        if(lectureOptional.isPresent()) {
            return lectureOptional.get();
        }else {
            throw new ResourceNotFoundException("Lecture", "ID", id);
        }
    }
}
