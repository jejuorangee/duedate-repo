package com.example.duedate.mapper;

import com.example.duedate.domain.vo.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void nicknameCheck(){
        String nick1 = "크레용신짱";
        String nick2 = "크레용";

        System.out.println(userMapper.nicknameCheck(nick1));
        System.out.println(userMapper.nicknameCheck(nick2));

    }

    @Test
    public void emailCheck(){
        String email1 = "123@naver.com";
        String email2 = "1234@naver.com";

        System.out.println(userMapper.emailCheck(email2));
        System.out.println(userMapper.emailCheck(email1));
    }

    @Test
    public void insertUser() {
        UserVO userVO = new UserVO();

        userVO.setUserEmail("123@naver.com");
        userVO.setUserName("신짱구");
        userVO.setUserNickName("크레용신짱");
        userVO.setUserPassword("123456");
//        userVO.setUserBirthday(LocalDate.now());
        userVO.setUserPic("프로필사진");

        userMapper.insertUser(userVO);
    }

}