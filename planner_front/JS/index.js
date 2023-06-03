<<<<<<< HEAD
var monthlyMode = true;

window.onload = onloadMonthly();

function changeCalendarView() {
  const calendarBtn = document.getElementById('calendarBtn');
  const monthly = document.getElementById('monthlyDiv');
  const weekly = document.getElementById('weeklyDiv');

  if (monthlyMode) {
    calendarBtn.value = 'MONTHLY';
    weekly.classList.remove('hidden');
    monthly.classList.add('hidden');
    monthlyMode = false;
    loadWeeklyCalendar(currentDate);
  } else {
    calendarBtn.value = 'WEEKLY';
    monthly.classList.remove('hidden');
    weekly.classList.add('hidden');
    monthlyMode = true;
    onloadMonthly();
=======
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
>>>>>>> da4d265 (feature-euntaek2)
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
<<<<<<< HEAD
}
const nextWeek = document.getElementById('nextButton');
const prevWeek = document.getElementById('prevButton');

nextWeek.addEventListener('click', function(){
  if(monthlyMode){
    clickNextMonth();
  } else{
    clickNextWeek();
  }
});

prevWeek.addEventListener('click', function(){
  if(monthlyMode){
    clickPrevMonth();
  } else{
    clickPrevWeek();
  }
});
=======
  console.log('changeView');
}
>>>>>>> da4d265 (feature-euntaek2)
