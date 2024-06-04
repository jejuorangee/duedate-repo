package com.example.duedate.service;

public interface RedisUtilService {

    String getData(String key);

    void setData(String key,String value);

    void setDataExpire(String key,String value,long duration);

    void deleteData(String key);
}
