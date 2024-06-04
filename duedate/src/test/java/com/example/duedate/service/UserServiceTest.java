package com.example.duedate.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    void findByUserNumber() {
    }

    @Test
    void insertUser() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void nicknameCheck() {
        String nick1 = "크레용신짱";
        String nick2 = "ㅋ";

        System.out.println(userService.nicknameCheck(nick1));
        System.out.println(userService.nicknameCheck(nick2));
    }

    @Test
    void emailCheck() {
    }
}