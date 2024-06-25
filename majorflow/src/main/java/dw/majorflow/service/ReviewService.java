package dw.majorflow.service;

import dw.majorflow.dto.ReviewDto;
import dw.majorflow.model.Review;
import dw.majorflow.model.User;
import dw.majorflow.repository.ReviewRepository;
import dw.majorflow.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.configurers.userdetails.UserDetailsAwareConfigurer;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    UserRepository userRepository;

    public Review saveReview(Review review) {
        review.setReviewTime(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    public List<Review> getReviewAll() {
        return reviewRepository.findAll();
    }

    public List<ReviewDto> getReviewAllByDto() {
        List<Review> reviewList = reviewRepository.findAll();
        List<ReviewDto> reviewDtoList = new ArrayList<>();
        for (int i=0; i<reviewList.size(); i++) {
            ReviewDto reviewDto = new ReviewDto();
            reviewDtoList.add(reviewDto.toReviewDtoFromReview(reviewList.get(i)));
        }
        return reviewDtoList;
    }
}