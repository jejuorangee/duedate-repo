package com.example.duedate.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.ModelAndView;


@Slf4j
@RestControllerAdvice
public class ExceptionRestControllerAdvice {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResult> NullPointerExceptionHandler(NullPointerException e){
        ErrorResult errorResult = new ErrorResult("Email", e.getMessage(),false);
        return new ResponseEntity<>(errorResult,HttpStatus.BAD_REQUEST);
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(LoginFailException.class)
    public ResponseEntity<ErrorResult> LoginFailExceptionHandler(LoginFailException e){
//    public ModelAndView LoginFailExceptionHandler(LoginFailException e){
        ErrorResult errorResult = new ErrorResult("error",e.getMessage(),false);
        return new ResponseEntity<>(errorResult, HttpStatus.BAD_REQUEST);
//        ResponseEntity<ErrorResult> loginerr = new ResponseEntity<>(errorResult, HttpStatus.BAD_REQUEST);
//        return loginerr;
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.addObject(loginerr);
//        modelAndView.setViewName("/duedate");
//        return modelAndView;

    }
}
