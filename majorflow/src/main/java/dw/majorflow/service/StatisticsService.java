package dw.majorflow.service;

import dw.majorflow.repository.ReviewRepository;
import dw.majorflow.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Service
public class StatisticsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserActivityService userActivityService;

    public long getUSerCount() {
        return userRepository.count();
    }

    public long getReviewCount() {
        return reviewRepository.count();
    }

    public long getLoginCount() {
        return userActivityService.getLoginCount();
    }
}
