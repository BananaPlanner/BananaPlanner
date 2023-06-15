/* 1~17번째 줄까지는 당일의 날짜를 구하는 코드 */
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
/* htmlm에 요소 가져오기 (투두리스트, textBox여는 버튼, textBox, textBox안 제목 입력칸, textBox안 내용 입력칸, 투두 저장버튼, 투두 삭제 버튼) */
const todoList = document.querySelector('#todoList');
const addTodoBtn = document.querySelector('.addTodoListBtn');
const textArea = document.querySelector('#textArea');
const todoTitle = document.querySelector('#todoTitle_input');
const saveTodoBtn = document.querySelector('#saveTodoBtn');
const todoContent = document.querySelector('#todoContent_input');
const deleteTodoBtn = document.querySelector('#deleteTodoBtn');

/* localStorage에 저장되는 todo 배열 */
let todos = [];
/* 투두 수정할 때 사용하는 선택된 index값, 지금은 선택된 것이 없으니 -1 */
let selectedTodoIndex = -1;
const TODOS = 'todos';

/* 투두리스트, 일기의 날짜 초기에 당일로 설정 */
todoFullDate.innerText = `${todoYear}년 ${todoMonth}월 ${todoDate}일 ${todoDay}`;
diaryDate.innerText = `${todoYear}년 ${todoMonth}월 ${todoDate}일 ${todoDay}`;

/* 투두리스트에 +버튼 누를 시 textBox가 나오게 하는 함수 */
function setVisible() {
  /* +버튼이 열려있는지 닫혀있는지 여부는 class에 addTodoListBtn이 있는지 closeTodoListBtn이 있는지 구별을 통해 */
  if (addTodoBtn.classList.contains('addTodoListBtn')) {
    /* +버튼이 닫혀있는 경우 textBox의 class에서 hidden을 제거 */
    textArea.classList.remove('hidden');
    /* +버튼의 class add에서 close로 교체*/
    addTodoBtn.classList.remove('addTodoListBtn');
    addTodoBtn.classList.add('closeTextArea');
    addTodoBtn.innerText = 'X';
    todoList.id = 'changedUL';
    todoTitle.value = '';
    todoContent.value = '';
  } else if (addTodoBtn.classList.contains('closeTextArea')) {
    /* +버튼이 열려있는 경우 textBox의 class에 hidden 추가 */
    document.querySelectorAll('#todoList li label').id = '';
    textArea.classList.add('hidden');
    addTodoBtn.classList.remove('closeTextArea');
    addTodoBtn.classList.add('addTodoListBtn');
    addTodoBtn.innerText = '+';
    todoList.id = 'todoList';
    todoTitle.value = '';
    todoContent.value = '';
    /* textBox가 닫히는 경우 만약 투두리스트에 선택된 투두가 있다면 해당 투두의 상태를 다시 선택되지 않음으로 돌려줌 */
    const allList = document.querySelectorAll(' li label');
    for (let list of allList) {
      list.id = '';
    }
    selectedTodoIndex = -1;
  }
}
/* textBox의 열림을 강제하는 함수 */
function setVisibleTrue() {
  /* textBox가 닫힘 상태라면 */
  if (addTodoBtn.classList.contains('addTodoListBtn')) {
    textArea.classList.remove('hidden');
    addTodoBtn.classList.remove('addTodoListBtn');
    addTodoBtn.classList.add('closeTextArea');
    addTodoBtn.innerText = 'X';
    todoList.id = 'changedUL';
  }
}

/* textBox의 닫힘을 강제하는 함수 */
function setVisibleFalse() {
  /* textBox가 열림 상태라면 */
  if (addTodoBtn.classList.contains('closeTextArea')) {
    textArea.classList.add('hidden');
    addTodoBtn.classList.remove('closeTextArea');
    addTodoBtn.classList.add('addTodoListBtn');
    addTodoBtn.innerText = '+';
    todoList.id = 'todoList';
    selectedTodoIndex = -1;
  }
}

function updateTodoCount(dateString) {
}


let isDateString = "";
function loadTodos(dateString){
  isDateString = dateString;
}

function updateTodoCount(){
  let test = 0;
  const listLabel = document.querySelectorAll('li label');
  for (let i = 0; i < listLabel.length; i++) {
    console.log(listLabel[i]);
    test++;
  }
  let dayText = selectedDay.innerText.split('\n')[0];

  if(listLabel.length != 0){
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

  if (selectedTodoIndex != -1) {
    todos[selectedTodoIndex].title = title_;
    todos[selectedTodoIndex].content = content_;
    for (let i of listLabel) {
      if (i.id === 'selectedLabel') {
        i.innerText = title_;
      }
      i.id = '';
    }
    localStorage.setItem(TODOS, JSON.stringify(todos));
  } else {
    const input = {
      date: todoFullDate.innerHTML,
      title: title_,
      content: content_,
      check: false,
      selected: false,
    };
    if (title_ != '' || content_ != '') {
      todos.push(input);
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
  console.log(label);
  for (let todo of todos) {
    if (todo.title === label) {
      return todo;
    }
  }
  return null;
}

function searchTodoByDay(todo) {
  const todoDay = todo.date;
  if (parseInt(todoDay.split(" ")[2]) === parseInt(todoFullDate.innerHTML.split(" ")[2])) {
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

function deleteTodo(event) {
  event.preventDefault();
  const deleteTodoTitle = todoTitle.value;
  const deleteTodoIndex = searchTodoIndex(deleteTodoTitle);
  //console.log(deleteTodoIndex);
  todos.splice(deleteTodoIndex, 1);
  localStorage.setItem(TODOS, JSON.stringify(todos));
  const listLabel = document.querySelectorAll('li label');
  const list = document.querySelectorAll('li');
  for (let i = 0; i < listLabel.length; i++) {
    if (listLabel[i].id === 'selectedLabel') {
      console.log(list[i]);
      list[i].remove();
    }
    i.id = '';
  }
  setVisibleFalse();
  updateTodoCount();
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
