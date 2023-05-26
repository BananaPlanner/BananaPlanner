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
// 제목과 내용, 체크여부
const TODOS = 'todos';

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
    document.querySelectorAll('#todoList li label').id = '';
    textArea.classList.add('hidden');
    addTodoBtn.classList.remove('closeTextArea');
    addTodoBtn.classList.add('addTodoListBtn');
    addTodoBtn.innerText = '+';
    todoList.id = 'todoList';
  }
}

function addTodo(event) {
  event.preventDefault();
  const title_ = todoTitle.value;
  const content_ = todoContent.value;
  todoTitle.value = '';
  todoContent.value = '';
  const input = {
    date: todoFullDate.innerHTML,
    title: title_,
    content: content_,
    check: false,
    selected: false,
  };
  if (title_ != '' && content_ != '') {
    todos.push(input);
    localStorage.setItem(TODOS, JSON.stringify(todos));
    paint(input);
  } else {
    alert('제목과 내용을 써주세요.');
  }
  setVisibleFalse();
}

function paint(input) {
  const li = document.createElement('li');
  const text = document.createElement('input');
  text.value = input.title;
  text.type = 'radio';
  text.checked = input.check;
  text.selected = input.selected;
  const label = document.createElement('label');
  label.innerText = input.title;
  label.for = input.title;
  li.appendChild(text);
  li.appendChild(label);
  todoList.appendChild(li);
  label.addEventListener('click', setViewTodo);
}

function setViewTodo(event) {
  const allList = document.querySelectorAll(' li label');
  for (let list of allList) {
    list.id = '';
  }
  const label = event.target;
  console.log(label);
  const todo = searchTodoTitle(label);
  if (todo != null) {
    todo.selected = !todo.selected;
    if (todo.selected) {
      for (let todo_ of todos) {
        todo_.selected = false;
      }
      todo.selected = true;
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
  console.log(label.innerText);
  console.log(todos);
  for (let todo of todos) {
    if (todo.title === label.innerText) {
      return todo;
    }
  }
  return null;
}

function searchTodoByDay(todo) {
  const todoDay = todo.date;
  if (todoDay === todoFullDate.innerHTML) {
    return todo;
  } else return null;
}

function searchTodoIndex(label) {
  console.log(label.innerText);
  let found = {};
  let index = -1;
  let check = false;
  for (let todo of todos) {
    if (!check) index++;
    if (todo.title === label.innerText) {
      found = todo;
      check = !check;
    }
  }
  return index;
}

function deleteTodo(event) {
  event.preventDefault();
  const deleteTodoTitle = todoTitle.value;
  console.log(deleteTodoTitle);
  const deleteTodoIndex = searchTodoIndex(deleteTodoTitle);
  console.log(deleteTodoIndex);
  todos.splice(deleteTodoIndex, 1);
  localStorage.setItem(TODOS, JSON.stringify(todos));
  setVisibleFalse();
}

const observerTodo = new MutationObserver(function () {
  const items = todoList.getElementsByTagName('li');
  savedTodos = localStorage.getItem(TODOS);
  for (let i = 0; i < items.length; i++) items[i].remove();
  if (savedTodos != null) {
    const parsedToDos = JSON.parse(savedTodos);
    console.log(parsedToDos);
    const selectedDayTodos = [];
    for (let todo of parsedToDos) {
      if (searchTodoByDay(todo) !== null)
        selectedDayTodos.push(searchTodoByDay(todo));
    }
    selectedDayTodos.forEach(paint);
    console.log(selectedDayTodos);
  }
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
