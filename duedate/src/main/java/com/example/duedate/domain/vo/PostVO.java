package com.example.duedate.domain.vo;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class PostVO {
        private Long postId;
        private Long userNumber;
        private String userEmail;
        private String postTitle;
        private String postContent;
        private int postViews;
        private LocalDateTime postDate;
        private LocalDateTime postUpdateDate;
}
