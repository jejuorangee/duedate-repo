package com.example.duedate.service;


public interface EmailService {

    String sendEmail(String email);

    boolean CheckAuthNum(String email, String authNum);
}
