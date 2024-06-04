package com.example.duedate.mapper;

import com.example.duedate.domain.dto.PostsDTO;
import com.example.duedate.domain.vo.PostVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PostMapperTest {
    @Autowired
    private PostMapper postMapper;

    @Test
    public void insertTest(){
        PostVO postVO = new PostVO();
        postVO.setPostId(1L);
        postVO.setPostTitle("안녕하세요");
        postVO.setPostContent("반갑습니다");
        System.out.println("출력확인");

    }
    @Test
    public void  selectAllTest(){
        PostVO postVO = new PostVO();
        System.out.println(postVO.getPostId());
        System.out.println(postVO.getUserEmail());
        System.out.println(postVO.getPostContent());

    }
}
