package com.example.duedate.mapper;

import com.example.duedate.domain.dto.DiaryDTO;
import com.example.duedate.domain.vo.DiaryVO;
import com.example.duedate.mapper.DiaryMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class DiaryMapperTest {

    @Autowired
    DiaryMapper diaryMapper;

    @Test
    void getSeq(){
        diaryMapper.getSeq();
    }

    @Test
    void insertDiary() {
        DiaryVO diaryVO = new DiaryVO();

        diaryVO.setDiaryId(1L);
        diaryVO.setDiaryDate("2024-05-07");
        diaryVO.setDiaryEmo("🍔");
        diaryVO.setDiaryTitle("안녕하세요");
        diaryVO.setDiaryContent("반값습니다");
        diaryVO.setUserNumber(1L);


        System.out.println(diaryVO);
        System.out.println("insert 메소드 확인");

        diaryMapper.insertDiary(diaryVO);
    }

    @Test
    void updateDiary() {
        DiaryDTO diaryDTO = new DiaryDTO();

        diaryDTO.setDiaryEmo("🍔");
        diaryDTO.setDiaryTitle("안녕하세요");
        diaryDTO.setDiaryContent("반값습니다");

        System.out.println(diaryDTO);
        System.out.println("update 메소드 확인");
    }

}