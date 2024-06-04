/*
왜 인증 팝업이 2번뜰까....고쳐보겠슴당
*/


// 닉네임 중복체크
let nickResult1;
$('#userNickName').on("propertychange chang keyup paste input", function (){

    let tmpNick = $('#userNickName').val();
    // console.log(tmpNick);
    let userNickName = {tmpNick : tmpNick};
    // console.log(userNickName);
    if(tmpNick != null){
        $.ajax({
            type : "post",
            url : "/user/userNickChk",
            async : false,
            data :userNickName,
            success : function (result) {
                // console.log(result);
                if (result != "fail") {
                    $("#nicknameError").css({"display": "block", "color": "green"});
                    $(".nickname-result").text("사용가능한 닉네임입니다");
                    nickResult1 = true;

                } else {
                    $("#nicknameError").css({"display": "block", "color": "red"});
                    $('.nickname-result').text("이미 가입된 닉네임입니다");
                    nickResult1 = false;
                }

            }
        });
    }

    // console.log(nickResult1);
    return nickResult1;
})

// ////////////////////////////////////////////////////////////////////




// document.addEventListener('DOMContentLoaded', function() {
//     let certiNum = '';
//     let isSent = false;
//
//     document.querySelector('.emailverify-button').addEventListener('click', function() {
//         if (!isSent) {
//             isSent = true;
//             certiNum = Math.floor(100000 + Math.random() * 900000).toString();
//             alert("인증번호: " + certiNum);
//         }
//     });
//
//     document.querySelector('.confirmverify-button').addEventListener('click', function() {
//         if (isSent) {
//             var verificationCode = document.getElementById('verificationCode').value;
//             if (verificationCode === certiNum) {
//                 alert("인증이 완료되었습니다.");
//                 isSent = false;
//             } else {
//                 alert("올바르지 않은 번호입니다.");
//             }
//         }
//     });
//
//     document.querySelector('.reverify-button').addEventListener('click', function() {
//         certiNum = Math.floor(100000 + Math.random() * 900000).toString();
//         alert("새 인증번호: " + certiNum);
//         isSent = true;
//     });
//
//     selectDateOption();
// });


function validateForm() {
    let valid = true;

    // const username = document.getElementById('username').value;
    // const nickname = document.getElementById('nickname').value;
    // const email = document.getElementById('email').value;
    const password = document.getElementById('userPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('service-terms').checked;
    const privacy = document.getElementById('privacy-policy').checked;
    const marketing = document.getElementById('third-party').checked;
    // const ageConfirmation = document.getElementById('age-confirmation').checked;
    // if (nickname === "existingNickname") {
    //
    // document.getElementById('nicknameError').style.display = 'block';
    //
    // } else {
    //     document.getElementById('nicknameError').style.display = 'none';}
    if(!nickResult1){
        alert("사용할 수 없는 닉네임입니다");
        $('#userNickName').focus();
        valid = false;
    } else if(!emailResult){
        alert("이메일 오류\n다시시도해 주세요");
        valid = false;
    }
    if (password.length < 6) {
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('confirmPasswordError').style.display = 'none';
    }
    if(birthM == null || birthD == null || birthY == null){
        alert("생년월일을 입력해 주세요");
        valid = false;
    }
    // !ageConfirmation
    if (!terms || !privacy || marketing) {
        alert('모든 필수 항목을 확인해주세요.');
        valid = false;
    }
    if (valid === true) {
        alert('가입이 완료되었습니다!');
    }
    return valid;

}


// onclick="checkEmail()"
// function checkEmail(){}
//이메일 유효성 검사 및 이메일 인증
function emailRegexCheck(email_address){
    let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(email_regex.test(email_address)){
        return true;
    } else {
        return false;
    }
}
let emailResult;
$('.emailverify-button').on("click",function(){
    let tmpEmail = $('#userEmail').val();
    let userEmail = {tmpEmail: tmpEmail};
    // alert(tmpEmail);
    // console.log(tmpEmail);
    // console.log("클릭됨");
    if(emailRegexCheck(tmpEmail)){
        let jqxhr = $.ajax({
            type : "post",
            url : "/user/userEmailChk",
            async : false,
            data :userEmail
        })
        jqxhr.then(function (emailChkResult){
            // console.log(result);
            if (emailChkResult != "fail") {
                $("#emailError").css("display", "none");
                // alert("사용가능한 이메일입니다");
                emailResult = true;
            }
            else {
                $("#emailError").css({"display": "block", "color": "red"});
                emailResult = false;

            }
        })
        .then(function (){
            // console.log("실행");
            if(emailResult != false ){
                $.ajax({
                    type : "post",
                    url : "/user/mailSend",
                    data : userEmail,
                    success : function (){
                        // console.log(result);
                        alert("인증번호가 발송되었습니다\n"+"작성하신 이메일을 확인해주세요");
                        $('.emailverify-button').attr("disabled", true);
                        $('.reverify-button').attr("disabled", false);
                    }
                })
            }
        })
        .then($('.confirmverify-button').on("click",function (){
            let tmpAuth = $('#verificationCode').val();
            // let authNum = {tmpauth,tmpauth};
            $.ajax({
                type : "post",
                url : "/user/mailauthCheck",
                data : {tmpEmail : tmpEmail,
                        tmpAuth : tmpAuth},
                success : function (res){
                    if(res == "ok"){
                        $("#verificationCode").attr('readonly',true);
                        $("#verificationCode").css("background-color", "gray");
                        alert("인증이 완료되었습니다");
                        emailResult = true;
                    }else if(res != "ok"){
                        alert("인증번호를 확인해 주세요\n"+"인증번호를 못받으셨다면 인증번호 재전송 버튼을 눌러주세요");
                        emailResult = false;
                    }
                }
            })
        }))
        .then($('.reverify-button').on("click", function (){
            let tmpEmail = $('#userEmail').val();
            let userEamil = {tmpEmail: tmpEmail};
            if(emailResult == false){
                $.ajax({
                    type : "post",
                    url : "/user/mailSend",
                    data : userEamil,
                    success : function (){
                        // console.log(result);
                        alert("인증번호가 발송되었습니다\n"+"작성하신 이메일을 확인해주세요");
                    }
                })
            }
        }));
    }else{
        alert("형식에 맞는 이메일을 입력해주세요\n"+"ex) 이메일@주소.형식");
    }
    return emailResult;

    // const email = document.getElementById('email').value;
    // if (email === "existingEmail@example.com") {
    //     document.getElementById('emailError').style.display = 'block';
    // } else {
    //     document.getElementById('emailError').style.display = 'none';
    // }

});

/////////////////////////////////////////////////////////////




let birth;
let birthM;
let birthD;
let birthY;
$(document).ready(function() {
    selectDateOption();
});
function selectDateOption(){
    const monthSelect = document.getElementById('birthday-month');
    const daySelect = document.getElementById('birthday-day');
    const yearSelect = document.getElementById('birthday-year');
    const userBirth = document.querySelector("#userBirthday");
    for (let i = 1; i <= 12; i++) {
        let option = new Option(i, i);
        monthSelect.add(option);
    }
    for (let i = 1; i <= 31; i++) {
        let option = new Option(i, i);
        daySelect.add(option);
    }
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        let option = new Option(i, i);
        yearSelect.add(option);
    }
    // birth

    monthSelect.addEventListener('change',function (){
        birthM = $("#birthday-month option:checked").text();
        birth = birthY+"-"+birthM+"-"+birthD;
        console.log(birthM);

        // userBirth.innerText = birth;
    });
    daySelect.addEventListener('change', function (){
        birthD = $("#birthday-day option:checked").text();
        birth = birthY+"-"+birthM+"-"+birthD;
        console.log(birthD);

        // userBirth.innerText = birth;
    });
    yearSelect.addEventListener('change', function (){
        birthY = $("#birthday-year option:checked").text();
        console.log(birthY);
        birth = birthY+"-"+birthM+"-"+birthD;
        userBirth.innerText = birth;
        $('#userBirthday').attr('value',birth);
        // console.log($('#userBirthday').val());
    });
    // console.log(birth);


}


window.togglePasswordVisibility = function(inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    const isPasswordVisible = passwordInput.getAttribute("type") === "text";
    passwordInput.setAttribute("type", isPasswordVisible ? "password" : "text");
    icon.innerText = isPasswordVisible ? "visibility" : "visibility_off";
};