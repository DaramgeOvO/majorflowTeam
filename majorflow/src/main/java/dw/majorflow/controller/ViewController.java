package dw.majorflow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/articles")
    public String article() {
        return "article";
    }
    @GetMapping("/majorflow/index.html")
    public String index() {
        return "index";
    }

    @GetMapping("/majorflow/login.html")
    public String login() {
        return "login";
    }

    @GetMapping("majorflow/signup.html")
    public String signup() {return "signup"; }

    @GetMapping("majorflow/about.html")
    public String about() {return "about"; }

    @GetMapping("majorflow/course.html")
    public String course() {return "course"; }

    @GetMapping("majorflow/enrollment.html")
    public String enrollment() {return "enrollment"; }

    @GetMapping("majorflow/customer.html")
    public String customer() {return "customer"; }

    @GetMapping("majorflow/review.html")
    public String review() {return "review"; }

    @GetMapping("majorflow/mypage.html")
    public String mypage() {return "mypage"; }

    @GetMapping("majorflow/cart.html")
    public String cart() {return "cart"; }

    @GetMapping("majorflow/lecture.html")
    public String lecture() {return "lecture"; }

    @GetMapping("/majorflow/admin.html")
    public String admin() {
        return "admin";
    }
}
