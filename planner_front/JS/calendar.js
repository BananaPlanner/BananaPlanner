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
    });
  }

  document.getElementById('monthYearDisplay').innerText = `${year}년 ${
    month + 1
  }월`;
}

function firstLoadSettingTodo(){
  const dayDivs = document.getElementsByClassName('day');
  const Date = document.getElementById('monthYearDisplay');

  for (let i = 0; i < dayDivs.length; i++) {
    const dayDiv = dayDivs[i];
    let year = parseInt(Date.innerText.split(" ")[0])
    let month = parseInt(Date.innerText.split(" ")[1])
    let day = dayDiv.innerText.split("\n")[0]
    let selectedDate = `${year}${month}${day}`
    selectedDay = dayDiv;
    savedTodos = localStorage.getItem(TODOS);
    if (savedTodos != null) {
      let count = 0;
      const parsedToDos = JSON.parse(savedTodos);
      for (let todo of parsedToDos) {
        const day = todo.date.split(' ')[2];
        const dayNumber = parseInt(day);
      let year2 = parseInt(todo.date.split(' ')[0])
      let month2 = parseInt(todo.date.split(' ')[1])
      let day2 = parseInt(todo.date.split(' ')[2])
      let diaryDate = `${year2}${month2}${day2}`
        if(selectedDate == diaryDate){
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
  const changeBtn = document.getElementById('changeBtn');
  const todoList = document.getElementById('todoListDiv');
  const diary = document.getElementById('diaryDiv');
  
  const dayDivs = document.getElementsByClassName('day');
  const Date = document.getElementById('monthYearDisplay');


  const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));

  if(parsedDiary != null){
  for (let i = 0; i < dayDivs.length; i++) {
    const dayDiv = dayDivs[i];
    let year = parseInt(Date.innerText.split(" ")[0])
    let month = parseInt(Date.innerText.split(" ")[1])
    let day = dayDiv.innerText.split("\n")[0]
    let selectedDate = `${year}${month}${day}`
    for (let pdiary of parsedDiary) {
      
      let year2 = parseInt(pdiary.date.split(' ')[0])
      let month2 = parseInt(pdiary.date.split(' ')[1])
      let day2 = parseInt(pdiary.date.split(' ')[2])
      let diaryDate = `${year2}${month2}${day2}`
      if(selectedDate == diaryDate){
        const bananaImage = document.createElement('img');
        bananaImage.src = './img/banana.png';
        bananaImage.width = 50;
        dayDiv.appendChild(bananaImage);
        bananaImage.addEventListener('click', function (e) {
          changeBtn.value = 'DIARY';
          diary.classList.remove('hidden');
          todoList.classList.add('hidden');
          todoListMode = false;
          e.stopPropagation();
          dayDiv.click();
          
        });
      }

    }
  }
} 
}

function todoSettingDiary() { // todo추가하면 바나나 이미지 사라지는 오류 수정 메서드
  const changeBtn = document.getElementById('changeBtn');
  const todoList = document.getElementById('todoListDiv');
  const diary = document.getElementById('diaryDiv');
  
  const dayDivs = document.getElementsByClassName('day');
  const Date = document.getElementById('monthYearDisplay');


  const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));

  if(parsedDiary != null){
  for (let i = 0; i < dayDivs.length; i++) {
    const dayDiv = dayDivs[i];
    let year = parseInt(Date.innerText.split(" ")[0])
    let month = parseInt(Date.innerText.split(" ")[1])
    let day = dayDiv.innerText.split("\n")[0]
    let selectedDate = `${year}${month}${day}`
    for (let pdiary of parsedDiary) {
      if(dayDiv.innerHTML.indexOf('src') < 0){
      let year2 = parseInt(pdiary.date.split(' ')[0])
      let month2 = parseInt(pdiary.date.split(' ')[1])
      let day2 = parseInt(pdiary.date.split(' ')[2])
      let diaryDate = `${year2}${month2}${day2}`
      if(selectedDate == diaryDate){
        const bananaImage = document.createElement('img');
        bananaImage.src = './img/banana.png';
        bananaImage.width = 50;
        dayDiv.appendChild(bananaImage);
        bananaImage.addEventListener('click', function (e) {
          changeBtn.value = 'DIARY';
          diary.classList.remove('hidden');
          todoList.classList.add('hidden');
          todoListMode = false;
          e.stopPropagation();
          dayDiv.click();
          
        });
      }
      }

    }
  }
} 
}

function setBananaIcon(date){
  const dayDivs = document.getElementsByClassName('day');
  const day = date.split(' ')[2];
  const dayNumber = parseInt(day);

  const changeBtn = document.getElementById('changeBtn');
  const todoList = document.getElementById('todoListDiv');
  const diary = document.getElementById('diaryDiv');
  
  for (let i = 0; i < dayDivs.length; i++) {
    const dayDiv = dayDivs[i];
    if(dayDiv.innerText.split("\n")[0] == dayNumber){
      if(dayDiv.innerHTML.indexOf('src') < 0){
        console.log(dayDiv.innerHTML)
        const bananaImage = document.createElement('img');
        bananaImage.src = './img/banana.png';
        bananaImage.width = 50;
        dayDiv.appendChild(bananaImage);

        bananaImage.addEventListener('click', function (e) {
          changeBtn.value = 'DIARY';
          diary.classList.remove('hidden');
          todoList.classList.add('hidden');
          todoListMode = false;
          e.stopPropagation();
          e.target.parentElement.click();
          
        });
      }
    }
  }
}
function setBananaIcon2(dateString, selectedDay){ // 일기가 채워져있다면 아이콘 추가해주기

  const changeBtn = document.getElementById('changeBtn');
  const todoList = document.getElementById('todoListDiv');
  const diary = document.getElementById('diaryDiv');

  const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));

  let year = dateString.getFullYear();
  let month = dateString.getMonth() + 1;
  let day = dateString.getDate();
  let selectedDate = `${year}${month}${day}`

  if(parsedDiary != null){
  for (let pdiary of parsedDiary) {
    let year2 = parseInt(pdiary.date.split(' ')[0])
    let month2 = parseInt(pdiary.date.split(' ')[1])
    let day2 = parseInt(pdiary.date.split(' ')[2])
    let diaryDate = `${year2}${month2}${day2}`
      if(selectedDate == diaryDate){
        if(selectedDay.innerHTML.indexOf('src') < 0){
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
          e.target.parentElement.click();
          
        });

        if(pdiary.diary.length == 0){
          selectedDay.removeChild(bananaImage);
        }
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

      let dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), e.target.innerText.split('\n')[0]);
      setBananaIcon2(dateString, selectedDay);
      
    });
    dayDivs[i].addEventListener('dblclick', function (e) {
    });
  }
}

calendar.addEventListener('dblclick', function (e) {
  if (e.target.className === 'day' && e.target.innerText !== '') {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerText.split('\n')[0]));
    showModal(selectedDate);
    achievementInfo(e.target);
    todoListInfo(e.target);
    diaryInfo(e.target);
  }
});

function clickNextMonth(){
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadCalendar(currentDate);
}


function clickPrevMonth(){
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadCalendar(currentDate);
}
