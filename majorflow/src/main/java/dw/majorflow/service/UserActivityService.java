package dw.majorflow.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserActivityService {

    private AtomicLong loginCount;

    @PostConstruct
    public void init() {
        // 초기화 : 0 으로 시작
        loginCount = new AtomicLong(0);
    }

    public void logUserLogin() {
        // 로그인 횟수 증가
        loginCount.incrementAndGet();
    }

    public long getLoginCount() {
        // 현재 로그인 횟수 반환
        return loginCount.get();
    }
}


