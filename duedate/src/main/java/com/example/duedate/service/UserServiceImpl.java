package com.example.duedate.service;

import com.example.duedate.domain.vo.UserVO;
import com.example.duedate.exception.LoginFailException;
import com.example.duedate.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserMapper userMapper;


    @Override
    public UserVO findByUserNumber(Long userNumber) {
        return userMapper.findByUserNumber(userNumber);
    }

    @Override
    public void insertUser(UserVO userVO) {
        userMapper.insertUser(userVO);
    }

    @Override
    public UserVO login(UserVO userVO) {
        UserVO user =  userMapper.login(userVO.getUserEmail(), userVO.getUserPassword()).orElseThrow(()->{
            throw new LoginFailException("로그인 실패");
        });
        return user;
    }

    @Override
    public void updateUser(UserVO userVO) {
        userMapper.updateUser(userVO);
    }

    @Override
    public int nicknameCheck(String userNickName) {
        return userMapper.nicknameCheck(userNickName);
    }

    @Override
    public int emailCheck(String userEmail) {
        return userMapper.emailCheck(userEmail);
    }
}
