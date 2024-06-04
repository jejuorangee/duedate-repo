package com.example.duedate.domain.vo;

import lombok.Data;

@Data
public class TaskVO {
    private Long taskId;
    private Long userNumber;
    private String category;
    private String task1;
    private String task2;
    private String task3;
    private String task4;
    private String task5;
    private String categoryColor;
    private String taskDate;
}
