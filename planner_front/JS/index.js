// function saveDiary() {
//   const textarea = document.getElementById('textForm')
//   const content = textarea.value;
//   console.log(content);
//   alert("저장되었습니다. "+content)
// }

var monthlyMode = true;

function changeCalendarView() {
    const calendarBtn = document.getElementById("calendarBtn");

    if(monthlyMode){
        calendarBtn.value = "MONTHLY";
        monthlyMode = false;
    } else {
        calendarBtn.value = "WEEKLY"
        monthlyMode = true;
    }
}

var todoListMode = true;

function changeView() {
    const changeBtn = document.getElementById("changeBtn");

    if(todoListMode){
        changeBtn.value = "DIARY";
        todoListMode = false;
    } else {
        changeBtn.value = "TODOLIST";
        todoListMode = true;
    }
    console.log("changeView");
  }