package com.example.duedate.controller;

import com.example.duedate.domain.vo.DiaryVO;
import com.example.duedate.service.DiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/diary")
public class DiaryController {

    private final DiaryService diaryService;

    @GetMapping("")
    public String diary(){
        return "diary_html/diarypage";
    }

    //일기 작성 -> 일기 상세

//    @GetMapping("/writeDiary")
//    public void writeDairy(DiaryVO diaryVO){
//        log.info(String.valueOf(diaryVO));
//        System.out.println(diaryVO);
//        diaryService.insertDiary(diaryVO);
////        diaryService.selectEmoAll(); //이모티콘 정제 후 달력 연동 해야됨
//    }

    @PostMapping("/writeDiary")
    public RedirectView insertDairy(DiaryVO diaryVO){

        log.info(String.valueOf(diaryVO));
        System.out.println(diaryVO);
        diaryService.insertDiary(diaryVO);
//        diaryService.selectEmoAll(); //이모티콘 정제 후 달력 연동 해야됨
        return new RedirectView("/diary/diaryDetail");
    }

    @GetMapping("/diaryDetail")
    public void diaryDetail(Long diaryId, Model model){
        DiaryVO diaryVO = diaryService.selectDiaryDetail(diaryId);
        model.addAttribute("diaryVO", diaryVO);
    }



}
