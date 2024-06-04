package com.example.duedate.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class LoginFailException extends RuntimeException {
    public LoginFailException(String message) {
//        System.out.println(message);
        super(message);

    }
}
