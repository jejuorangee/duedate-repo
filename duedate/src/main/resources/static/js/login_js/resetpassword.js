document.addEventListener("DOMContentLoaded", function() {
    let verificationCode = "";

    function verficationNum() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    document.querySelector(".emailverify-button").addEventListener("click", function() {
        verificationCode = verficationNum().toString();
        alert("인증번호: " + verificationCode);
    });

    document.querySelector(".reverify-button").addEventListener("click", function() {
        verificationCode = verficationNum().toString();
        alert("재발송된 인증번호: " + verificationCode);
    });

    document.querySelector(".confirmverify-button").addEventListener("click", function() {
        const userCode = document.getElementById("verificationCode").value;
        const errorElement = document.querySelectorAll(".error-message")[1];
        if(userCode === verificationCode) {
            alert("인증이 완료되었습니다.");
            errorElement.style.display = "none";
        } else {
            errorElement.style.display = "flex";
            errorElement.textContent = "올바른 인증번호를 입력하세요.";
        }
    });

    document.getElementById("resetForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        let isValid = true;

        if(password.length < 6) {
            document.querySelectorAll(".error-message")[2].style.display = "flex";
            isValid = false;
        } else {
            document.querySelectorAll(".error-message")[2].style.display = "none";
        }

        if(password !== confirmPassword) {
            document.querySelectorAll(".error-message")[3].style.display = "flex";
            isValid = false;
        } else {
            document.querySelectorAll(".error-message")[3].style.display = "none";
        }

        if(isValid) {
            alert("비밀번호가 성공적으로 재설정되었습니다!");
        }
    });

    window.togglePasswordVisibility = function(inputId, icon) {
        const passwordInput = document.getElementById(inputId);
        const isPasswordVisible = passwordInput.getAttribute("type") === "text";
        passwordInput.setAttribute("type", isPasswordVisible ? "password" : "text");
        icon.innerText = isPasswordVisible ? "visibility" : "visibility_off";
    };
});
