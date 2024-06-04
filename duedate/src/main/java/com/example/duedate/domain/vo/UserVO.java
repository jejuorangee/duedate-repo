package com.example.duedate.domain.vo;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;


//import java.sql.Date;


import java.util.Date;

@Data
public class UserVO {
    private Long userNumber;
    private String userName;
    private String userNickName;
    private String userEmail;
    private String userPassword;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date userBirthday;
    private String userPic;


}
