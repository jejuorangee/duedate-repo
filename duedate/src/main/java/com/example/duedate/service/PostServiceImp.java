package com.example.duedate.service;


import com.example.duedate.domain.dto.PostsDTO;
import com.example.duedate.domain.vo.PostVO;
import com.example.duedate.domain.vo.UserVO;
import com.example.duedate.mapper.PostMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostServiceImp implements PostService{
    private final PostMapper postMapper;

    public PostServiceImp(PostMapper postMapper) {
        this.postMapper = postMapper;
    }

    @Override
    @Transactional
    public void insertPost(PostVO postVO) {
        Long postId = postMapper.getSeq();
        postVO.setPostId(postId);
        postMapper.insertPost(postVO);
    }

    @Override
    public PostsDTO selectPostDetail(Long postId , UserVO userVO) {
        String borderUserEmail = postMapper.selectPostDetail(postId).getUserId();

        if(userVO.getUserNumber()==null || !userVO.getUserEmail().equals(borderUserEmail)){
            postMapper.plusViews(postId);
        }
        return postMapper.selectPostDetail(postId);

    }

    @Override
    @Transactional
    public void updatePost(PostVO postVO) {
        postMapper.updatePost(postVO);
    }

    @Override
    @Transactional
    public void deletePost(long postId) {
        postMapper.deletePost(postId);
    }

    @Override
    public List<PostsDTO> selectAll() {
        return postMapper.selectAll();
    }
}
