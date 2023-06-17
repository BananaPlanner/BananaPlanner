let currentDate = new Date();
let selectedDay = null;

function loadCalendar(date) {
  let month = date.getMonth();
  let year = date.getFullYear();
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let calendar = document.getElementById('calendar');
  let displayBox = document.getElementById('displayBox');

  let calendarHtml = '';

  dayNames.forEach((day) => {
    calendarHtml += `<div class='weekday'>${day}</div>`;
  });

  for (let i = 0; i < firstDay; i++) {
    calendarHtml += `<div class='day'>&nbsp;</div>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarHtml += `<div class='day'>${i}</div>`;
  }

  calendar.innerHTML = calendarHtml;

  calendar.addEventListener('click', function (e) {
    if (e.target.className === 'day' && e.target.innerText !== '') {
      /*       displayBox.innerText = `${year}-${month + 1}-${e.target.innerText}`;
       */
    }
  });

  let dayDivs = calendar.getElementsByClassName('day');
  for (let i = 0; i < dayDivs.length; i++) {
    dayDivs[i].addEventListener('click', function (e) {
      if (selectedDay !== null) {
        selectedDay.style.backgroundColor = '';
      }
      selectedDay = e.target;
      selectedDay.style.backgroundColor = 'yellow';
      let week = [
        
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',

      ];
      const k = e.target.innerText.split('\n');

      let day = week[new Date(year, month, k[0]).getDay()];
      document.querySelector('#todoList-date').innerText = `${year}년 ${
        month + 1
      }월 ${k[0]}일 ${day}`;
      document.querySelector('#diary-date').innerText = `${year}년 ${
        month + 1
      }월 ${k[0]}일 ${day}`;
      /*       displayBox.innerText = `${year}-${month + 1}-${e.target.innerText}`; */
    });
  }

  document.getElementById('monthYearDisplay').innerText = `${year}년 ${
    month + 1
  }월`;
}

function firstLoadSettingTodo(){
  const dayDivs = document.getElementsByClassName('day');

  for (let i = 0; i < dayDivs.length; i++) {
    const dayDiv = dayDivs[i];
    selectedDay = dayDiv;
    savedTodos = localStorage.getItem(TODOS);
    if (savedTodos != null) {
      let count = 0;
      const parsedToDos = JSON.parse(savedTodos);
      for (let todo of parsedToDos) {
        const day = todo.date.split(' ')[2];
        const dayNumber = parseInt(day);
        if(dayDiv.innerText == dayNumber){
          count++;
        }
      }
      if(count != 0){
        selectedDay.innerHTML = `${dayDiv.innerText}<br/>할일: ${count}`;
      }
      count = 0;
    }
  }
}
function firstLoadSettingDiary() {
  const dayDivs = document.getElementsByClassName('day');

  const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));

  if(parsedDiary != null){
  for (let i = 0; i < dayDivs.length; i++) {
    const dayDiv = dayDivs[i];
    for (let pdiary of parsedDiary) {
      
      if(dayDiv.innerText.split("\n")[0] == parseInt(pdiary.date.split(' ')[2])){
        const bananaImage = document.createElement('img');
        bananaImage.src = './img/banana.png';
        bananaImage.width = 50;
        dayDiv.appendChild(bananaImage);
      }

    }
  }
}
  
}

function setBananaIcon(date){
  const dayDivs = document.getElementsByClassName('day');
  const day = date.split(' ')[2];
  const dayNumber = parseInt(day);


  
  for (let i = 0; i < dayDivs.length; i++) {
    const dayDiv = dayDivs[i];
    if(dayDiv.innerText.split("\n")[0] == dayNumber){
      if(dayDiv.innerHTML.indexOf('src') < 0){
        console.log(dayDiv.innerHTML)
        const bananaImage = document.createElement('img');
        bananaImage.src = './img/banana.png';
        bananaImage.width = 50;
        dayDiv.appendChild(bananaImage);
      }
    }
  }
}
function setBananaIcon2(selectedDay){ // 첫 로딩때 일기가 채워져있다면 아이콘 추가해주기

  const changeBtn = document.getElementById('changeBtn');
  const todoList = document.getElementById('todoListDiv');
  const diary = document.getElementById('diaryDiv');


  const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));

  if(parsedDiary != null){
  for (let pdiary of parsedDiary) {
      if(selectedDay.innerText.split("\n")[0] == parseInt(pdiary.date.split(' ')[2])){
        const bananaImage = document.createElement('img');
        bananaImage.src = './img/banana.png';
        bananaImage.width = 50;
        selectedDay.appendChild(bananaImage);
        bananaImage.addEventListener('click', function (e) {
          
          changeBtn.value = 'DIARY';
          diary.classList.remove('hidden');
          todoList.classList.add('hidden');
          todoListMode = false;
          e.stopPropagation();
          selectedDay.click();
        });

        if(pdiary.diary.length == 0){
          selectedDay.removeChild(bananaImage);
        }
      }
  }
}
}



function onloadMonthly(){
  loadCalendar(currentDate);


  let dayDivs = document.getElementsByClassName('day');
  for (let i = 0; i < dayDivs.length; i++) {
    dayDivs[i].addEventListener('click', function (e) {
      if (selectedDay !== null) {
        selectedDay.style.backgroundColor = '';
      }
      selectedDay = e.target;
      selectedDay.style.backgroundColor = 'yellow';

      const bananaImage = document.createElement('img');
      bananaImage.src = './img/banana.png';
      bananaImage.width = 50;
      selectedDay.appendChild(bananaImage);

      let dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), e.target.innerText.split('\n')[0]);

      // let dateString = `${currentDate.getFullYear()}년 ${
      //   currentDate.getMonth() + 1
      // }월 ${e.target.innerText.split('\n')[0]}일`;
      loadTodos(dateString);
      updateTodoCount(dateString);
      setBananaIcon2(selectedDay);
    });
  }

}

function clickNextMonth(){
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadCalendar(currentDate);
}
// document.getElementById('nextButton').addEventListener('click', function () {
//   currentDate.setMonth(currentDate.getMonth() + 1);
//   loadCalendar(currentDate);
// });

function clickPrevMonth(){
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadCalendar(currentDate);
}
// document.getElementById('prevButton').addEventListener('click', function () {
//   currentDate.setMonth(currentDate.getMonth() - 1);
//   loadCalendar(currentDate);
// });

