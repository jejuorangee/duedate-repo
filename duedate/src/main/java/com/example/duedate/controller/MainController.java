package com.example.duedate.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j

public class MainController {

    @GetMapping("/duedate")
    public String index(){
        return "login_html/loginpage";
    }

    @GetMapping("/myduedate")
    public String goal(){
        return "goal_html/goalpage/goalpage";
    }

    @GetMapping("/community")
    public String community(){
        return "community_html/communitypage";
    }

    @GetMapping("/reset")
    public String reset(){
        return "login_html/resetpassword";
    }

    @GetMapping("/signup")
    public String signup(){
        return "login_html/registerpage";
    }

    @GetMapping("/myPage")
    public String myp(){
        return "mypage_html/mypage";
    }


}

