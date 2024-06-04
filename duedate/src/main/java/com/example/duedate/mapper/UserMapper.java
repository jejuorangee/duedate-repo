package com.example.duedate.mapper;

import com.example.duedate.domain.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface UserMapper {

//    user 정보 조회
    UserVO findByUserNumber(Long userNumber);

//    회원가입
    void insertUser(UserVO userVO);

//    로그인
    Optional<UserVO> login(String userEmail, String userPassword);

//    정보 수정
    void updateUser(UserVO userVO);

//  닉네임 중복 검사
    int nicknameCheck(String userNickName);

//  email 중복 검사
    int emailCheck(String userEmail);

}
