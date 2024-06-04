//---------------------------------------------------------- 큰달력 달력------------------------------------------------------------------
let date = new Date();
let currYear = date.getFullYear(),
    currMonth = date.getMonth();

// console.log(date);
// console.log(currYear);
// console.log(currMonth);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// console.log(months[currMonth]);

const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextBtn = document.querySelectorAll(".rightCalendarMonth button");
const rightGoToday = document.querySelector(".rightTodayButton");


const selectDateNgo = document.querySelector("#datepicker");


const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let divLiTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    divLiTag += `<div class="day">
        <li class="inactive">${lastDateofLastMonth - i + 1}</li>
      </div>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
            ? "active"
            : "";
    divLiTag += `<div id="dayOf${i}" class="day"><li class="${isToday}">${i}</li>
          <div class="hidden__content content${i}">
            <span class="todo__${i} todo_1" style="display:block"></span>
            <span class="todo__${i} todo_1" style="display:block"></span>
            <span class="todo__${i} todo_1" style="display:block"></span>
            <span class="DiaryEmo${i}" style="display:block"></span>
          </div>
        </div>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    divLiTag += `<div class="day">
        <li class="inactive">${i - lastDayofMonth + 1}</li>
      </div>`;
  }

  currentDate.innerText = `${months[currMonth]}🚓${+currYear}`;
  daysTag.innerHTML = divLiTag;
};
renderCalendar();

prevNextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    currMonth = btn.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

rightGoToday.addEventListener("click", () => {
  date = new Date();
  currYear = date.getFullYear();
  currMonth = date.getMonth();
  renderCalendar();
});

//-------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- 일기장 || 캘린더 버튼 클릭 시---------------------------------------------------------
const showDiary = document.getElementById("showDiary");
const showCalendarbtn = document.querySelector("#showCalendarbtn");

const diaryTitle = document.querySelector(".diaryOrCalendar");
const myDiary = document.querySelector(".myDiary");

const rightCalendarMonth = document.querySelector(".rightCalendarMonth");
const diaryCalender = document.querySelector(".diaryCalender");

showDiary.addEventListener("click", function () {
  if (myDiary.style.display == "none") {
    myDiary.style.display = "";
    diaryCalender.style.display = "none";
  }
});

showCalendarbtn.addEventListener("click", function () {
  if (diaryCalender.style.display == "none") {
    myDiary.style.display = "none";
    diaryCalender.style.display = "";
  }
});
// ----------------------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------------
// 일기장 유효성 검사
const writeDiaryForm = document.querySelector(".writeDiaryForm");

const myDiaryDate = document.querySelector("#datepicker");
const rightDiaryEmo = document.querySelector(".rightDiaryEmo");
const myDiaryTitle = document.querySelector(".myDiaryTitle");
const myDiaryDetail = document.querySelector(".myDiaryDetail");

const submitBtn = document.querySelector(".submit-button");
const cancel = document.querySelector("#cancel");

submitBtn.addEventListener("click", () => {
  if (myDiaryDate.value == "") {
    alert("날짜를 작성해 주세요");
  } else if (myDiaryTitle.value == "") {
    alert("제목을 작성해 주세요");
  } else if (myDiaryDetail.value == "") {
    alert("일기 내용을 작성해 주세요");
  } else {
    return true;

    alert("작성 완료");

    /*다이어리 데이트 벨류와 달력의 날짜가 같으면
    dayOf${o}아이디에 class="day ${haveDiary}" 추가
    li태그 뒤에 <span>${rightDiaryEmo.value}</span> 추가*/
    // alert(rightDiaryEmo.value);

    //달력이동 또는 투데이 버튼 클릭 또는 일기장에서 날짜선택 시 작동 이상 수정 필요
    const newTodo = document.querySelectorAll(".days span");
    const dayof = document.querySelectorAll(".day");
    // const leftCalDiarychk = document.querySelectorAll(".leftDays li")

    const chkDiary = () => {
      for (let k = 1; k <= 31; k++) {
        if (
            myDiaryDate.value ===
            date.getFullYear() + "-" + (currMonth + 1) + "-" + k
        ) {
          dayof[k - 1].className = "day haveDiary";
          newTodo[k - 1].innerText = rightDiaryEmo.value;
        } else {
        }
        // renderCalendar();
      }
    };
    chkDiary();
    writeDiaryForm.reset();

    // daysTag.innerHTML = `<span>😊</span>`;
    // let divEmoTag =
    // console.log(rightDiaryEmo.value);
    // if(myDiaryDate.value === df){
    // };
    //작성 완료 시 일기장
    //1 .DB연동
    //2. 날짜랑 이모티콘 가지고 큰달력으로 넘어가서 달력 위에 뿌리기
  }
});

cancel.addEventListener("click", () => {
  alert("일기장 작성 취소");
  writeDiaryForm.reset();
});
// ------------------------------------------------------------------------------------------------------------------------------------
// todolist------------------------------

var categoryTodoCounts = {
  category1: 0,
  category2: 0,
  category3: 0,
};
// 할일 만들기
document.addEventListener("click", function (event) {
  var target = event.target;
  if (target.classList.contains("add-todo")) {
    addNewTodoList(event);
  }
  // 할일 삭제하기
  if (target.classList.contains("todo-del")) {
    var todoItem = target.closest(".check-todo");
    if (todoItem) {
      var todoInput = todoItem.querySelector(".todo");
      todoInput.value = "";
    }
  }
});
//카테고리별 할일 갯수 5개로 한정하기
function addNewTodoList(event) {
  var addButton = event.target;
  var parentCategory = addButton.closest(".category");

  var categoryId = parentCategory.getAttribute("id");
  var todoCount = categoryTodoCounts[categoryId] || 0;

  if (todoCount >= 5) {
    alert("이 카테고리의 할일 목록은 최대 5개까지만 생성할 수 있습니다.");
    return;
  }

  // 할일 목록 개수를 증가
  categoryTodoCounts[categoryId] = todoCount + 1;

  // 새로운 할일 목록 생성
  var newTodoList = document.createElement("div");
  newTodoList.classList.add("check-todo");

  var todoWrap = document.createElement("div");
  todoWrap.classList.add("todo-wrap");

  var checkTodo = document.createElement("div");
  checkTodo.classList.add("check-todo");

  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");

  var inputTodo = document.createElement("input");
  inputTodo.classList.add("todo");
  inputTodo.setAttribute("placeholder", "할일");

  var todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.classList.add("todo-del");
  todoDeleteBtn.classList.add("material-symbols-outlined");
  todoDeleteBtn.innerText=("delete");

  // var deleteImg = document.createElement("img");
  // deleteImg.setAttribute("src", "./img/delete.png");
  // deleteImg.setAttribute("alt", "del");

  todoDeleteBtn.addEventListener("click", function (event) {
    var todoItem = this.closest(".check-todo");
    if (todoItem) {
      var todoInput = todoItem.querySelector(".todo");
      todoInput.value = "";
    }
    todoDeleteBtn.addEventListener("click", function (event) {
      if (todoItem) {
        var parent = todoItem.parentElement;
        parent.removeChild(todoItem);
        todoCount--;
      }
    });
  });

  // todoDeleteBtn.appendChild(deleteImg);
  checkTodo.appendChild(checkbox);
  checkTodo.appendChild(inputTodo);
  todoWrap.appendChild(checkTodo);
  todoWrap.appendChild(todoDeleteBtn);
  newTodoList.appendChild(todoWrap);

  // 생성된 새로운 할일 목록을 클릭된 버튼의 부모 요소에 추가
  parentCategory.nextElementSibling.appendChild(newTodoList);
  todoDeleteBtn.addEventListener("click", function (event) {
    var todoItem = this.closest(".check-todo");
    if (todoItem) {
      var todoInput = todoItem.querySelector(".todo");
      todoInput.value = "";

      var parent = todoItem.parentElement;
      parent.removeChild(todoItem);

      var categoryId = parentCategory.getAttribute("id");
      categoryTodoCounts[categoryId] = categoryTodoCounts[categoryId] - 1;
    }
  });
}
//달력에 todolist 추가하기
const DiaryEmo = document.querySelectorAll(".days span");
const newTodo = document.querySelectorAll(".days a");
const dayof = document.querySelectorAll(".day");
// const leftCalDiarychk = document.querySelectorAll(".leftDays li")
const selectDateNgoTodo = document.querySelector("#datepickerTodo");

const category1 = document.querySelector("#category1");


const categoryTodo1 = document.querySelector("category1");
const submitTodoBtn1 = document.querySelector("#submitTodo1");
const categoryName1 = document.querySelector("#categoryName1");

const categoryTodo2 = document.querySelector("category2");
const submitTodoBtn2 = document.querySelector("#submitTodo2");
const categoryTodo3 = document.querySelector("category3");
const submitTodoBtn3 = document.querySelector("#submitTodo3");

submitTodoBtn1.addEventListener("click", () => {
  const submitTodoCategory1 = () => {
    if (selectDateNgoTodo.value == "") {
      alert("날짜를 작성해 주세요");
    } else if (categoryName1.value == "") {
      alert("카테고리 이름을 작성해주세요");
    }else if(category1.style.backgroundColor == ""){
      alert("카테고리의 색상을 선택해주세요");
    } else {
      alert("작성 완료");
      return true;
      // for (let k = 1; k <= 31; k++) {
      //   if (
      //       myDiaryDate.value ===
      //       date.getFullYear() + "-" + (currMonth + 1) + "-" + k
      //   ) {
      //     dayof[k - 1].className = "day haveDiary";
      //     newTodo[k - 1].innerText = categoryName1.value;
      //   } else {
      //   }
      // }
    }
  };
  submitTodoCategory1();
});
// 케테고리 컬러변경
var colorModal = document.getElementById("colorModal");
var btn = document.getElementById("colorOpenModal");
var span = document.getElementsByClassName("color-close")[0];

btn.onclick = function () {
  colorModal.style.display = "block";
};

span.onclick = function () {
  colorModal.style.display = "none";
};

var selectedColors = {
  categoryColor1: null,
  categoryColor2: null,
  categoryColor3: null,
};

// 각 카테고리 색상 옵션에 대한 이벤트 처리
var categorySelectors = document.getElementsByClassName("category-selector");
for (var i = 0; i < categorySelectors.length; i++) {
  var colorBox = categorySelectors[i].getElementsByClassName("color-box")[0];
  colorBox.onclick = function (event) {
    var selectedColor = event.target.style.backgroundColor; // 선택된 색상
    var category = this.parentNode.getElementsByClassName("color-box")[0].id; // 선택된 카테고리

    // 선택된 색상 저장
    selectedColors[category] = selectedColor;

    // 해당 카테고리의 배경색 변경
    var categoryDiv = document.getElementById(category.replace("Color", ""));
    categoryDiv.style.backgroundColor = selectedColor;
    // 선택된 색상에 selected-color 클래스 추가
    var colorOptions = this.getElementsByClassName("color-option");
    for (var j = 0; j < colorOptions.length; j++) {
      colorOptions[j].classList.remove("selected-color");
    }
    event.target.classList.add("selected-color");
    // // 다른 카테고리에서 이미 선택된 색상인지 확인
    // for (var key in selectedColors) {
    //   if (key !== category && selectedColors[key] === selectedColor) {
    //     // 경고 메시지 표시
    //     alert("이미 선택된 색상입니다. 다른 색상을 선택하세요.");
    //     // 선택 취소
    //     selectedColors[category] = null;
    //     categoryDiv.style.backgroundColor = ""; // 배경색 제거
    //     return;
    //   }
    // }
  };
}
