package dw.majorflow.service;

import dw.majorflow.exception.ResourceNotFoundException;
import dw.majorflow.model.EduTech;
import dw.majorflow.model.Lecture;
import dw.majorflow.model.User;
import dw.majorflow.repository.EduTechRepository;
import dw.majorflow.repository.LectureRepository;
import dw.majorflow.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EduTechService {

    @Autowired
    EduTechRepository edutechRepository;

    @Autowired
    LectureRepository lectureRepository;

    @Autowired
    UserRepository userRepository;

    public List<EduTech> getAllEdutech(){return edutechRepository.findAll();}

    public EduTech getEduTechById(int EduTechId) {
        Optional<EduTech> eduTech = edutechRepository.findById(EduTechId);
        if (eduTech.isPresent()) {
            return eduTech.get();
        } else {
            throw new RuntimeException("Teacher not found with id: " + EduTechId);
        }
    }

    public void saveEduTech(String userId, long lectureId) {
        Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        if (lectureOptional.isPresent()) {
            Lecture lecture = lectureOptional.get();
            EduTech eduTech = new EduTech();
            eduTech.setLecture(lecture);
            eduTech.setUser(user);
            edutechRepository.save(eduTech);
        } else {
            throw new ResourceNotFoundException("Lecture", "lectureId", lectureId);
        }
    }

    public List<EduTech> getEduTechByUserId(String userId) {
        return edutechRepository.findByUserUserId(userId);
    }
}
