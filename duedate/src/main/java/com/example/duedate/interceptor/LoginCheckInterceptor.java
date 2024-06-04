package com.example.duedate.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoginCheckInterceptor implements HandlerInterceptor {
    //인터셉터 작동 순서 preHandler -> 요청 처리 -> postHandler -> View -> afterCompletion
    //preHandler 컨트롤러 요청 전 가로챔
    //postHandler 컨트롤러 요청 후 view 전달 전
    //afterCompletion 인터셉터로 해당 메서드가 끝나면 최종적으로 클라이언트에게 전달됨
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception{
        System.out.println("============인터셉터 시작============");

//        String requestURI = request.getRequestURI();
//        System.out.println("interceptor : " + requestURI);
        HttpSession session = request.getSession(false);

        if(session == null || session.getAttribute("LoginUser") == null){
            System.out.println("미로그인 사용자");

            response.sendRedirect("/duedate"); //
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception{
        System.out.println("==============컨트롤러 들렸다옴==============");
    }
}
