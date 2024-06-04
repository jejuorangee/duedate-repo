
document.addEventListener("DOMContentLoaded", function () {
    // var loginForm = document.getElementById("loginForm");
    //
    // loginForm.addEventListener("submit", function(event) {
    //     event.preventDefault();
    //
    //     const email = document.getElementById("email").value;
    //     const password = document.getElementById("password").value;
        const loginError = document.querySelector(".error-message");
    //
    //     if(email === "test@gmail.com" && password === "1234") {
    //         window.location.href = "/diary";
    //     } else {
    //         loginError.style.display = "";
    //         alert("이메일 또는 비밀번호가 틀렸습니다!.");
    //     }
    // });
    // $('#loginForm').on("submit", function (){
    //     // let email = $('#userEmail').val();
    //     // let password = $('#userPassword').val();
    //     $.ajax({
    //         type : "post",
    //         url : "/user/login",
    //         success : function (res){
    //             if(res == "/diary"){
    //                 window.location.href = "/diary";
    //             } else{
    //                 loginError.style.display = "";
    //             }
    //         }
    //     });
    // })


    const signupBtn = document.querySelector("#signupBtn");
    signupBtn.addEventListener("click", () => {
        window.location.href = "/signup";
    });

});
window.togglePasswordVisibility = function (inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    const isPasswordVisible = passwordInput.getAttribute("type") === "text";
    passwordInput.setAttribute("type", isPasswordVisible ? "password" : "text");
    icon.innerText = isPasswordVisible ? "visibility" : "visibility_off";
}
