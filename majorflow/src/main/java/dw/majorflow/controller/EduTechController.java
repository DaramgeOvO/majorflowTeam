package dw.majorflow.controller;

import dw.majorflow.model.EduTech;
import dw.majorflow.service.EduTechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/edutech")
public class EduTechController {

    @Autowired
    EduTechService eduTechService;

    @GetMapping("/get")
    public ResponseEntity<List<EduTech>> getAllEduTech() {
        return new ResponseEntity<>(eduTechService.getAllEdutech(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<EduTech> getEduTechById(@PathVariable("id") Integer EduTechId) {  // 변수명을 통일
        return new ResponseEntity<>(eduTechService.getEduTechById(EduTechId), HttpStatus.OK);
    }

    @PostMapping("/save/{userId}/{lectureId}")
    public ResponseEntity<EduTech> saveEduTech(@PathVariable String userId, @PathVariable long lectureId) {
        eduTechService.saveEduTech(userId, lectureId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}/lectures")
    public ResponseEntity<List<EduTech>> getEduTechByUserId(@PathVariable("userId") String userId) {
        List<EduTech> eduTechList = eduTechService.getEduTechByUserId(userId);
        return new ResponseEntity<>(eduTechList, HttpStatus.OK);
    }
}
