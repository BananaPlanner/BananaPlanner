const todoFullDate = document.querySelector('#todoList-date');
const today = new Date();
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
const addTodoBtn = document.querySelector('.addTodoList');
const textArea = document.querySelector('#textArea');
const todoTitle = document.querySelector('#todoTitle input');
const saveTodoBtn = document.querySelector('#saveTodoBtn');
const todoContent = document.querySelector('#todoContent input');
const deleteTodoBtn = document.querySelector('#deleteTodoBtn');

let todos = [];
// 제목과 내용
const TODOS = 'todos';

todoFullDate.innerText = `${todoMonth}월 ${todoDate}일 ${todoDay}`;

function setVisible() {
  if (addTodoBtn.classList.contains('addTodoList')) {
    textArea.classList.remove('hidden');
    addTodoBtn.classList.remove('addTodoList');
    addTodoBtn.classList.add('closeTextArea');
    addTodoBtn.innerText = 'X';
  } else if (addTodoBtn.classList.contains('closeTextArea')) {
    textArea.classList.add('hidden');
    addTodoBtn.classList.remove('closeTextArea');
    addTodoBtn.classList.add('addTodoList');
    addTodoBtn.innerText = '+';
  }
}

function addTodo(event) {
  event.preventDefault();
  const title_ = todoTitle.value;
  const content_ = todoContent.value;
  todoTitle.value = '';
  todoContent.value = '';
  const input = { title: title_, content: content_ };
  console.log(title_);
  console.log(content_);
  todos.push({ title: title_, content: content_ });
  localStorage.setItem(TODOS, JSON.stringify(todos));
  paint(input);
}

function paint(input) {
  const todo = input;
  const li = document.createElement('li');
  const text = document.createElement('input');
  text.value = input.title;
  text.type = 'radio';
  const label = document.createElement('label');
  label.innerText = input.title;
  label.for = input.title;
  li.appendChild(text);
  li.appendChild(label);
  todoList.appendChild(li);
  console.log('no');
}

addTodoBtn.addEventListener('click', setVisible);
saveTodoBtn.addEventListener('click', addTodo);

const savedTodos = localStorage.getItem(TODOS);

if (savedTodos != null) {
  const parsedToDos = JSON.parse(savedTodos);
  console.log(parsedToDos);
  todos = parsedToDos;
  parsedToDos.forEach(paint);
}
