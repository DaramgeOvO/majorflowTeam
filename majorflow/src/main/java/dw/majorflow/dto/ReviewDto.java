package dw.majorflow.dto;

import dw.majorflow.model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewDto {
    private long reviewID;
    private User user;
    private Lecture lecture;
    private String text;
    private int rating;

    public ReviewDto toReviewDtoFromReview(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewID(review.getReviewID());
        reviewDto.setUser(review.getUser());
        reviewDto.setLecture(review.getLecture());
        reviewDto.setText(review.getText());
        reviewDto.setRating(review.getRating());
        return reviewDto;
    }
}
