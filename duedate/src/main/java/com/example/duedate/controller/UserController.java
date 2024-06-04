package com.example.duedate.controller;

import com.example.duedate.domain.vo.UserVO;
import com.example.duedate.exception.ErrorResult;
import com.example.duedate.service.EmailService;
import com.example.duedate.service.RedisUtilService;
import com.example.duedate.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {


    private final UserService userService;
    private final EmailService emailService;
    private final RedisUtilService redisUtilService;
    private final HttpSession session;



    //    닉네임 중복 검사
//    @RequestMapping(value="/userNickChk", method=RequestMethod.POST)
    @PostMapping("/userNickChk")
    @ResponseBody
    public String userNickChkPOST(@RequestParam Map<String, Object> map){

//        log.info("userNickChk() 진입");
//        log.info(userNickName);

//        log.info((String)map.get("tmpNick"));
        String userNickName = (String)map.get("tmpNick");

        int result = userService.nicknameCheck(userNickName);

//        log.info("결과값 = " + result);

        if(result != 0){
            return "fail";
        } else {
            return "success";
        }
    }


    //이메일 중복 검사
    @PostMapping("/userEmailChk")
    @ResponseBody
    public String userEmailChkPOST(@RequestParam Map<String, Object> map){
//        log.info("userEmailChkPOST() 진입");

        String userEmail = (String)map.get("tmpEmail");

        int emailChkResult = userService.emailCheck(userEmail);
        log.info("result = "+ emailChkResult);

        if(emailChkResult !=0 ){
            return "fail";
        }else {
            return "success";
        }
    }

    //인증 메일
    @PostMapping("/mailSend")
    @ResponseBody
    public String mailSend(@RequestParam Map<String, Object> map){
        String userEmail = (String)map.get("tmpEmail");
        System.out.println("이메일인증 이메일 : " + userEmail);
        return emailService.sendEmail(userEmail);
    }

    //이메일 인증
    @PostMapping("/mailauthCheck")
    @ResponseBody
    public String authCheck(@RequestParam Map<String, Object> map){
//        Map<String, Object> map
        String userAuthNum = (String)map.get("tmpAuth");
        String userEmail = (String)map.get("tmpEmail");
//        log.info(userAuthNum);
//        log.info(userEmail);
        boolean EmailChecked = emailService.CheckAuthNum(userEmail,userAuthNum);
        if(EmailChecked){
            return "ok";
        }else{
            redisUtilService.deleteData(userEmail);
            return "error";
//            throw new NullPointerException("인증번호 오류");
        }
    }

    //인증번호 재전송
//    @PostMapping("/mailReAuthCheck")
//    @ResponseBody
//    public String ReAuthCheck(@RequestParam Map<String, Object> map){
//        String userAuthNum = (String)map.get("tmpAuth");
//        String userEmail = (String)map.get("tmpEmail");
//
//        boolean EmailChecked = emailService.CheckAuthNum(userEmail,userAuthNum);
//        if(EmailChecked){
//            return "Rok";
//        }else{
//            return "error";
////            throw new NullPointerException("인증번호 오류");
//        }
//    }


    @PostMapping("/regist")
    public RedirectView userSignup(UserVO userVO){
//        System.out.println(userVO);
        userService.insertUser(userVO);
        return new RedirectView("/login");
    }
//////////////////////////////////////////////////////////////////////////
//    @PostMapping("/login")
    @RequestMapping(value="/login" , method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public RedirectView login(UserVO userVO){
        System.out.println("로그인 컨트롤러");
//        System.out.println(userVO);
//        System.out.println(userVO.getUserEmail());
//        System.out.println(userVO.getUserPassword());

        UserVO user = userService.login(userVO);

//        System.out.println(user);
//        if(user == null){
////            return "LoginFail";
//
//        }else {
////            return "/diary";
//
//        }
            session.setAttribute("LoginUser", user);
            System.out.println("세션등록완"+session.getAttribute("LoginUser"));
        return new RedirectView ("/diary");
    }


//    @PostMapping("/login")
//    public String login(UserVO userVO){
////        System.out.println(userVO);
////        System.out.println(userVO.getUserEmail());
////        System.out.println(userVO.getUserPassword());
//
//        UserVO user = userService.login(userVO);
//        if(user != null){
//            session.setAttribute("email", userVO.getUserEmail());
//            return "/diary";
//
//        }else {
//            return "duedate";
//        }
//    }





//    @PostMapping("/login")
//    @ResponseBody
//    public String login(UserVO userVO, Model model,
//                        @RequestParam(value = "error", required = false)String error,
//                        @RequestParam(value = "exception", required = false)String exception,
//                        RedirectAttributes ra){
////        System.out.println(userVO);
////        System.out.println(userVO.getUserEmail());
////        System.out.println(userVO.getUserPassword());
//
//
//        UserVO user = userService.login(userVO);
//        if(user != null){
//            session.setAttribute("email", userVO.getUserEmail());
//            return "/diary";
//        }else{
//            ra.addFlashAttribute("error", error);
//            model.addAttribute("exception", exception);
//        }
//        return "duedate";
//    }

//    @GetMapping("/login")
//    private String showMessage(Model model,
//                               @RequestParam(value = "error", required = false)String error,
//                               @RequestParam(value = "exception", required = false)String exception){
//        model.addAttribute("error", error);
//        model.addAttribute("exception", exception);
//        return "/login";
//    }



//    @PostMapping("/login")
//    @ResponseBody
//    public String login(UserVO userVO){
////        String userEmail = (String)map.get("email");
////        String userPassword = (String)map.get("password");
////                System.out.println(userVO);
////        System.out.println(userVO.getUserEmail());
////        System.out.println(userVO.getUserPassword());
//       UserVO user =  userService.login(userVO);
//
//       if(user != null){
//           session.setAttribute("email", userVO.getUserEmail());
//           return "success";
//       }else{
//           return "fail";
//       }
//    }

//////////////////////////////////////////////////////////////////////////////
    @GetMapping("/logout")
    public RedirectView logout(){
        System.out.println("로그아웃");
        session.invalidate();
//        System.out.println(session.getAttribute("LoginUser"));

        return new RedirectView("/duedate");
    }
}
