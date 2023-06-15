currentDate = new Date();
var selectedWeekDay = null;

function loadWeeklyCalendar(date) {
  let weeklyCalendar = document.getElementById('weeklyCalendar');
  let dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  var today = date.getDay();
  var year = date.getFullYear();
	var month = date.getMonth();
	var todayDate = date.getDate();
  var weekNum = getWeekNum(date);
  var weekArr = [];

  var addDay = 0;
  for (var i = today; i < 7; i++) {
    weekArr[i] = new Date(year, month, todayDate + addDay);
	  addDay++;
  }

  var addDay = 0;
	for (var i = today - 1; i >= 0; i--) {
		--addDay;
		weekArr[i] = new Date(year, month, todayDate + addDay);
	}

  let calendarHtml = '';

  dayNames.forEach((day) => {
    calendarHtml += `<div class='weekday'>${day}</div>`;
  });

  for (var i = 0; i < 7; i++) {
		let weekDay =  weekArr[i].getDate();
    let weekToday = weekArr[i];
    calendarHtml += `<div class='weeklyDay'>`;
    calendarHtml += `<div class='weekDate'>${weekDay}</div>`;
    calendarHtml += `<div class='todayList'>`;
    calendarHtml += getTodoList(weekToday);
    calendarHtml += `</div>`;
    calendarHtml += '</div>';
  }

  weeklyCalendar.innerHTML = calendarHtml;

  let dayDivs = weeklyCalendar.getElementsByClassName('weeklyDay');
  for (let i = 0; i < dayDivs.length; i++) {
    dayDivs[i].addEventListener('click',  function(event){
      clickDay(event, weekArr[i]);
    });
  }
  document.getElementById('monthYearDisplay').innerText = `${month + 1}월 ${weekNum}주차`;
}

function getWeekNum(date) {
  let weekDate = new Date(date);
  const currentDay = weekDate.getDate();
  const startOfMonth = new Date(weekDate.setDate(1));
  const weekDay = startOfMonth.getDay();
  
  // ((요일 - 1) + 해당 날짜) / 7일로 나누기 = N 주차
  return parseInt(((weekDay - 1) + currentDay) / 7) + 1;
}

function clickDay(event, date) {
  if (selectedWeekDay !== null) {
    selectedWeekDay.style.backgroundColor = '';
  }
  selectedWeekDay = event.target;
  selectedWeekDay.style.backgroundColor = 'yellow';
  let week = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  
  var year = date.getFullYear();
	var month = date.getMonth();
  var clickDate = date.getDate();
  let day = week[new Date(year, month, clickDate).getDay()];
  document.querySelector('#todoList-date').innerText = `${year}년 ${
    month + 1
  }월 ${clickDate}일 ${day}`;
  document.querySelector('#diary-date').innerText = `${year}년 ${
    month + 1
  }월 ${clickDate}일 ${day}`;
}

function clickNextWeek() {
  currentDate.setDate(currentDate.getDate() + 7);
  loadWeeklyCalendar(currentDate);
}

function clickPrevWeek() {
  currentDate.setDate(currentDate.getDate() - 7);
  loadWeeklyCalendar(currentDate);
}

// const nextWeek = document.getElementById('nextButton');
// const prevWeek = document.getElementById('prevButton');
// nextWeek.addEventListener('click', clickNextWeek);
// prevWeek.addEventListener('click', clickPrevWeek);

function getTodoList(weekToday) {
  const savedTodo = localStorage.getItem('todos');
  const parsedToDo = JSON.parse(savedTodo);
  const selectedDayTodo = [];
  
  console.log(parsedToDo);
  for (let todo of parsedToDo) {
    if (searchTodo(todo, weekToday) !== null)
      selectedDayTodo.push(todo);
  }

  let todoListHtml = '';
  let index = 0;
  for(let todo of selectedDayTodo) {
    console.log(todo);
    todoListHtml += paintTodo(todo, todoListHtml,index);
    index++;
  }
  return todoListHtml;

}


function searchTodo(todo, weekToday) {
  const todoDay = todo.date;
  let weekDays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  let todoListYear = weekToday.getFullYear();
  let todoListMonth = weekToday.getMonth() + 1;
  let todoListDate = weekToday.getDate();
  let todoListDay = weekDays[weekToday.getDay()];

  let todoListFullDate = `${todoListYear}년 ${todoListMonth}월 ${todoListDate}일 ${todoListDay}`;


  if (todoDay === todoListFullDate) {
    return todo;
  } else 
    return null;
}

function paintTodo(todo, todoListHtml) {
  todoListHtml += `<li>`;
  todoListHtml += `<input class='todoText' type ='radio' 
                  value='${todo.title}' checked='${todo.check}' selected = '${todo.selected}'
                  />`;
  todoListHtml += `<label class='todoLabel' for = '${todo.title}'>${todo.title}</label>`;
  todoListHtml += `</li>`;

  return todoListHtml;
}

// window.onload = loadWeeklyCalendar(currentDate);