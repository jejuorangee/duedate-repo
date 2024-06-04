package com.example.duedate.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;


import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    @Autowired
    private final JavaMailSender mailSender;
//    private final SpringTemplateEngine templateEngine;

    @Autowired
    private final RedisUtilService redisUtilService;
    private String authNum;


    //코드 생성
    public void createCode(){
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i = 0; i < 8; i++){
            int index = random.nextInt(3);

            switch (index){
                case 0:
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 67));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    //메일 양식
    public MimeMessage createEmailForm(String email){
//        MimeMessage message = mailSender.createMimeMessage();
        MimeMessage message = mailSender.createMimeMessage();
        createCode(); //인증코드 생성

        try {
            String setFrom = "idjjh1998@gmail.com";
            String toEmail = email; //받는 사람
            String title = "DUDATE 회원가입 인증번호"; //메일 제목
            String content =
                    "DUEDATE를 방문해주셔서 감사합니다." +
                            "<br><br>" +
                            "<p>아래 코드를 인증번호 확인란에 정확히 입력해주세요</p>" +
                            "<br><br>" +
                            "<div align='center' style='border:1px solid black; font-family:verdana';>" +
                            "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>" +
                            "<div style='font-size:130%'>" +
                            "CODE : <strong>" + authNum + "</strong><div><br></div>" +
                            "<br><br>" +
                            "<p>감사합니다</p>";

            message.addRecipients(MimeMessage.RecipientType.TO, email);
            message.setSubject(title);
            message.setFrom(setFrom);
            message.setText(content,"utf-8","html");
        } catch (MessagingException e){
            e.printStackTrace();
        }
        redisUtilService.setDataExpire(authNum,email,60*3L);
        return message;
    }



    @Override
    public String sendEmail(String email) {
        MimeMessage emailForm = createEmailForm(email);

        mailSender.send(emailForm);
        return authNum;
    }

    @Override
    public boolean CheckAuthNum(String email, String authNum){
        if(redisUtilService.getData(authNum)==null){
            return false;
        }else if(redisUtilService.getData(authNum).equals(email)){
            return true;
        }else{
            return false;
        }
    }

}
