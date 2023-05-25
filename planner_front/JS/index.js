// function saveDiary() {
//   const textarea = document.getElementById('textForm')
//   const content = textarea.value;
//   console.log(content);
//   alert("저장되었습니다. "+content)
// }

var monthlyMode = true;

function changeCalendarView() {
  const calendarBtn = document.getElementById('calendarBtn');

  if (monthlyMode) {
    calendarBtn.value = 'MONTHLY';
    monthlyMode = false;
  } else {
    calendarBtn.value = 'WEEKLY';
    monthlyMode = true;
  }
}

let todoListMode = true;

function changeView() {
  const changeBtn = document.getElementById('changeBtn');
  const todoList = document.getElementById('todoListDiv');
  const diary = document.getElementById('diaryDiv');

  if (todoListMode) {
    changeBtn.value = 'DIARY';
    diary.classList.remove('hidden');
    todoList.classList.add('hidden');
    todoListMode = false;
  } else {
    changeBtn.value = 'TODOLIST';
    diary.classList.add('hidden');
    todoList.classList.remove('hidden');
    todoListMode = true;
  }
  console.log('changeView');
}
