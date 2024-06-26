package dw.majorflow.controller;

import dw.majorflow.dto.ReviewDto;
import dw.majorflow.model.Review;
import dw.majorflow.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @PostMapping("/save")
    public ResponseEntity<Review> saveReview(@RequestBody Review review) {
        return new ResponseEntity<>(reviewService.saveReview(review),
                HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Review>> getReviewAll() {
        return new ResponseEntity<>(reviewService.getReviewAll(),
                HttpStatus.OK);
    }

    @GetMapping("/dto")
    public ResponseEntity<List<ReviewDto>> getReviewAllByDto() {
        return new ResponseEntity<>(reviewService.getReviewAllByDto(),
                HttpStatus.OK);
    }
}