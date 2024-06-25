package dw.majorflow.controller;

import dw.majorflow.model.Lecture;
import dw.majorflow.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LectureController {
    LectureService lectureService;

    @Autowired
    public LectureController(LectureService lectureService) {this.lectureService = lectureService; }

    @GetMapping("/lectures")
    public ResponseEntity<List<Lecture>> getAllLectures() {
        return new ResponseEntity<>(lectureService.getAllLectures(), HttpStatus.OK);
    }

    @GetMapping("/lectures/{id}")
    public ResponseEntity<Lecture> getLectureById(@PathVariable long id) {
        return new ResponseEntity<>(lectureService.getLectureById(id),
                HttpStatus.OK);
    }
}


