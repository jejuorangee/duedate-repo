package com.example.duedate.service;


import com.example.duedate.domain.vo.UserVO;


public interface UserService {

    UserVO findByUserNumber(Long userNumber);

    void insertUser(UserVO userVO);

    UserVO login(UserVO userVO);

    void updateUser(UserVO userVO);

    int nicknameCheck(String userNickName);

    int emailCheck(String userEmail);


}
