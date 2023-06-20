// todolist-end2

const todoFullDate = document.querySelector('#todoList-date');
const diaryDate = document.querySelector('#diary-date');
const today = new Date();
const todoYear = today.getFullYear();
const todoMonth = today.getMonth() + 1;
const todoDate = today.getDate();
const WEEK = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];
const todoDay = WEEK[today.getDay()];
const todoList = document.querySelector('#todoList');
const addTodoBtn = document.querySelector('.addTodoListBtn');
const textArea = document.querySelector('#textArea');
const todoTitle = document.querySelector('#todoTitle_input');
const saveTodoBtn = document.querySelector('#saveTodoBtn');
const todoContent = document.querySelector('#todoContent_input');
const deleteTodoBtn = document.querySelector('#deleteTodoBtn');

let todos = [];
let selectedTodoIndex = -1;
// 제목과 내용, 체크여부
const TODOS = 'todos';
let url;
todoFullDate.innerText = `${todoYear}년 ${todoMonth}월 ${todoDate}일 ${todoDay}`;
diaryDate.innerText = `${todoYear}년 ${todoMonth}월 ${todoDate}일 ${todoDay}`;

function setVisible() {
  if (addTodoBtn.classList.contains('addTodoListBtn')) {
    textArea.classList.remove('hidden');
    addTodoBtn.classList.remove('addTodoListBtn');
    addTodoBtn.classList.add('closeTextArea');
    addTodoBtn.innerText = 'X';
    todoList.id = 'changedUL';
    todoTitle.value = '';
    todoContent.value = '';
  } else if (addTodoBtn.classList.contains('closeTextArea')) {
    document.querySelectorAll('#todoList li label').id = '';
    textArea.classList.add('hidden');
    addTodoBtn.classList.remove('closeTextArea');
    addTodoBtn.classList.add('addTodoListBtn');
    addTodoBtn.innerText = '+';
    todoList.id = 'todoList';
    todoTitle.value = '';
    todoContent.value = '';
    const allList = document.querySelectorAll(' li label');
    for (let list of allList) {
      list.id = '';
    }
    selectedTodoIndex = -1;
  }
}

function setVisibleTrue() {
  if (addTodoBtn.classList.contains('addTodoListBtn')) {
    textArea.classList.remove('hidden');
    addTodoBtn.classList.remove('addTodoListBtn');
    addTodoBtn.classList.add('closeTextArea');
    addTodoBtn.innerText = 'X';
    todoList.id = 'changedUL';
  }
}

function setVisibleFalse() {
  if (addTodoBtn.classList.contains('closeTextArea')) {
    document.querySelectorAll('li label').id = '';
    textArea.classList.add('hidden');
    addTodoBtn.classList.remove('closeTextArea');
    addTodoBtn.classList.add('addTodoListBtn');
    addTodoBtn.innerText = '+';
    todoList.id = 'todoList';
    selectedTodoIndex = -1;
  }
}


function updateTodoCount(dateString) { }

let isDateString = '';
function loadTodos(dateString) {
  isDateString = dateString;
}

function updateTodoCount() {
  let test = 0;
  const listLabel = document.querySelectorAll('ul li label');

  for (let i = 0; i < listLabel.length; i++) {
    
    test++;
  }
  let dayText = selectedDay.innerText.split('\n')[0];


  if (listLabel.length != 0) {

    selectedDay.innerHTML = `${dayText}<br/>할일: ${listLabel.length}`;
  } else {
    selectedDay.innerHTML = dayText;
  }
}

function addTodo(event) {
  event.preventDefault();
  const title_ = todoTitle.value;
  const content_ = todoContent.value;
  const listLabel = document.querySelectorAll('li label');
  for (let i = 0; i < listLabel.length; i++) {
    if (listLabel[i].id === 'selectedLabel') {
      selectedTodoIndex = i;
    }
  }

  if (selectedTodoIndex != -1) {
    let temp = searchTodoID(todos[selectedTodoIndex].title)
    console.log(temp)
    todos[selectedTodoIndex].title = title_;
    todos[selectedTodoIndex].content = content_;
    for (let i of listLabel) {
      if (i.id === 'selectedLabel') {
        i.innerText = title_;
      }
      i.id = '';
    }

    
    /* API연결 필요 */
    url = '/updateTodoItem';
    $.ajax({
      method: 'POST',
      url: url,
      data: {
        todoID: temp,
        title: title_,
        content: content_,
      }
    }).done(function (res) {
      console.log("내용수정"+content_)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log("실패"+errorThrown)
    });

    /* 선택된 todo의 내용을 수정하고 다시 local에 저장 */
    localStorage.setItem(TODOS, JSON.stringify(todos));
  } else {
    let today = new Date();
    let todoID = "" + today.getFullYear() + today.getMonth() + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds();
    const input = {

      id: todoID,
      date: todoFullDate.innerHTML,
      title: title_,
      content: content_,
      check: false,
      selected: false,
    };
    if (title_ != '' || content_ != '') {
      todos.push(input);
      /* API연결 필요 */
      url = '/addTodoItem';
      $.ajax({
        method: 'POST',
        url: url,
        data: {
          id: todoID,
          date: input.date,
          title: input.title,
          content: input.content,
          check: false,
          selected: false,
        }
      }).done(function (res) {

      }).fail(function (jqXHR, textStatus, errorThrown) {

      });
      /* 새로운 todo를 추가 */
      localStorage.setItem(TODOS, JSON.stringify(todos));
      paint(input);
    } else {
      alert('제목과 내용을 써주세요.');
    }
  }
  todoTitle.value = '';
  todoContent.value = '';
  setVisibleFalse();
  updateTodoCount();
  updateWeekTodo();
  todoSettingDiary();
}

function paint(input) {
  const li = document.createElement('li');
  const text = document.createElement('input');
  text.value = input.title;
  text.type = 'checkbox';
  text.checked = input.check;
  text.selected = input.selected;
  const label = document.createElement('label');
  label.innerText = input.title;
  label.for = input.title;
  text.value = input.title;
  text.addEventListener('click', setCheck);
  li.appendChild(text);
  li.appendChild(label);
  todoList.appendChild(li);
  label.addEventListener('click', setViewTodo);
}

function setCheck(event) {
  const todo = searchTodoTitleValue(event.target.value);
  if (todo != null) {
    todo.check = event.target.checked;
    /* API연결 필요 */
    url = '/updateTodoItemCheck';
    $.ajax({
      method: 'POST',
      url: url,
      data: {
        todoID: todo.id,
        check: todo.check,
      }
    }).done(function (res) {
      console.log("체크"+todo.check)
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log("실패"+errorThrown)
    });

    /* todo의 check여부에 변화가 생겼을 시 이를 local에 저장 */
    localStorage.setItem(TODOS, JSON.stringify(todos));
  } else {
    console.log('not found');
  }
}

function setViewTodo(event) {
  const allList = document.querySelectorAll(' li label');
  for (let list of allList) {
    list.id = '';
  }
  const label = event.target;
  const todo = searchTodoTitle(label);
  if (todo != null) {
    todo.selected = !todo.selected;
    if (todo.selected) {
      for (let todo_ of todos) {
        todo_.selected = false;
      }
      todo.selected = true;
      selectedTodoIndex = searchTodoIndex(label);
      setVisibleTrue();
      todoTitle.value = todo.title;
      todoContent.value = todo.content;
      label.id = 'selectedLabel';
    } else {
      for (let todo_ of todos) {
        todo_.selected = false;
      }
      setVisibleFalse();
      label.id = '';
      todoTitle.value = '';
      todoContent.value = '';
    }
  }
}
function searchTodoTitle(label) {
  for (let todo of todos) {
    if (todo.title === label.innerText) {
      return todo;
    }
  }
  return null;
}

function searchTodoTitleValue(label) {
  
  for (let todo of todos) {
    if (todo.title === label) {
      return todo;
    }
  }
  return null;
}

function searchTodoByDay(todo) {
  const todoDay = todo.date;
  let year1 = parseInt(todoDay.split(' ')[0]);
  let month1 = parseInt(todoDay.split(' ')[1]);
  let day1 = parseInt(todoDay.split(' ')[2]);
  let todoDayDate = `${year1}${month1}${day1}`;

  let year2 = parseInt(todoFullDate.innerHTML.split(' ')[0]);
  let month2 = parseInt(todoFullDate.innerHTML.split(' ')[1]);
  let day2 = parseInt(todoFullDate.innerHTML.split(' ')[2]);
  let todoFullDayDate = `${year2}${month2}${day2}`;
  if (todoDayDate === todoFullDayDate) {
    return todo;
  } else return null;
}

function searchTodoIndex(label) {
  let index = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].title === label) {
      index = i;
    }
  }
  return index;
}
function searchTodoID(label){
  let id = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].title === label) {
      id = todos[i].id;
    }
  }
  return id;
}
function deleteTodo(event) {
  event.preventDefault();
  const deleteTodoTitle = todoTitle.value;
  const deleteTodoIndex = searchTodoIndex(deleteTodoTitle);
  
  let idTodelete = searchTodoID(deleteTodoTitle)
  todos.splice(deleteTodoIndex, 1);
  
  
  /* API연결 필요 */
  /* 해당 todo를 지우고 local에 저장된 todos를 해당 todo를 지운 배열로 다시 설정 */
  localStorage.setItem(TODOS, JSON.stringify(todos));
  const listLabel = document.querySelectorAll('li label');
  const list = document.querySelectorAll('li');
  for (let i = 0; i < listLabel.length; i++) {
    
    if (listLabel[i].id === 'selectedLabel') {
      list[i].remove();
      url = 'deleteTodoItem'
      
      $.ajax({
        method: 'DELETE',
        url: url,
        data: {
          id: idTodelete,
        }
      }).done(function (res) {
        
        
      }).fail(function (jqXHR, textStatus, errorThrown) {
        
      });
    
      
    }
    i.id = '';
  }
  setVisibleFalse();
  updateWeekTodo();
  updateTodoCount();
  todoSettingDiary();
}

const observerTodo = new MutationObserver(function () {
  const items = document.querySelectorAll('ul li');
  savedTodos = localStorage.getItem(TODOS);
  for (let i = 0; i < items.length; i++) items[i].remove();
  if (savedTodos != null) {
    const parsedToDos = JSON.parse(savedTodos);
    const selectedDayTodos = [];
    for (let todo of parsedToDos) {
      if (searchTodoByDay(todo) !== null)
        selectedDayTodos.push(searchTodoByDay(todo));
    }
    selectedDayTodos.forEach(paint);
  }
  setVisibleFalse();
});

observerTodo.observe(todoFullDate, {
  subtree: true,
  characterData: true,
  childList: true,
});

deleteTodoBtn.addEventListener('click', deleteTodo);
addTodoBtn.addEventListener('click', setVisible);
saveTodoBtn.addEventListener('click', addTodo);

/* API연결 필요 */
/* 처음 화면이 로딩될 때 해당 user의 정보를 local에 저장한 후 다음 코드가 실행되게 해야함 */
let savedTodos = localStorage.getItem(TODOS);

if (savedTodos != null) {
  const parsedToDos = JSON.parse(savedTodos);
  todos = parsedToDos;
  const selectedDayTodos = [];
  for (let todo of parsedToDos) {
    if (searchTodoByDay(todo) !== null)
      selectedDayTodos.push(searchTodoByDay(todo));
  }
  selectedDayTodos.forEach(paint);
}
