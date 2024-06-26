package dw.majorflow.controller;

import dw.majorflow.service.StatisticsService;
import dw.majorflow.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @Autowired
    private UserActivityService userActivityService;

    // 방문자 수, 사용자 수, 리뷰 수를 Count 해서 통계내는 코드
    @GetMapping
    public ResponseEntity<Map<String, Long>> getStatistics() {
        long userCount = statisticsService.getUSerCount();
        long reviewCount = statisticsService.getReviewCount();
        long loginCount = statisticsService.getLoginCount();

        Map<String, Long> stats = new HashMap<>();
        stats.put("userCount", userCount);
        stats.put("reviewCount", reviewCount);
        stats.put("loginCount", loginCount);

        return ResponseEntity.ok(stats);
    }
}
