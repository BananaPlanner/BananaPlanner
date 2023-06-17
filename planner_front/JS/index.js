var monthlyMode = true;

window.onload = function() {
  onloadMonthly();
  firstLoadSettingTodo();
  firstLoadSettingDiary()
}

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
  }
  firstLoadSetting();
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
}
const nextWeek = document.getElementById('nextButton');
const prevWeek = document.getElementById('prevButton');

nextWeek.addEventListener('click', function(){
  if(monthlyMode){
    clickNextMonth();
  } else{
    clickNextWeek();
  }
  firstLoadSetting();
});

prevWeek.addEventListener('click', function(){
  if(monthlyMode){
    clickPrevMonth();
  } else{
    clickPrevWeek();
  }
  firstLoadSetting();
});