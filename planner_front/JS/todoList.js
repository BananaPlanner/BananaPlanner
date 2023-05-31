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

/* 투두 추가 및 수정 버튼의 함수 */
function addTodo(event) {
  event.preventDefault();
  /* 입력된 제목과 내용을 변수에 저장 */
  const title_ = todoTitle.value;
  const content_ = todoContent.value;
  /* 투두 수정의 경우를 위해 투두리스트의 모든 투두 중 선택된 것이 있나 확인하고 있다면 해당 투두의 index값을 selectedTodoIndex에 반환 */
  /*   const listLabel = document.querySelectorAll('li label');
  for (let i = 0; i < listLabel.length; i++) {
    if (listLabel[i].id === 'selectedLabel') {
      selectedTodoIndex = i;
    }
  } */
  /* selectedTodoIndex가 -1이 아니므로 선택된 투두가 있어 해당 투두를 수정하는 경우 */
  if (selectedTodoIndex != -1) {
    /* 투두가 저장되어 있는 todos 배열에서 해당 index의 값을 입력받았던 수정된 값으로 변경*/
    todos[selectedTodoIndex].title = title_;
    todos[selectedTodoIndex].content = content_;
    todos[selectedTodoIndex].selected = false;
    /* 투두의 제목이 수정된 경우 이를 위의 리스트에도 반영해주어야 하기 때문에  리스트 중 id가 selectedLabel인 투두의 제목을 입력받은 값으로 수정*/
    for (let i of listLabel) {
      if (i.id === 'selectedLabel') {
        i.innerText = title_;
      }
      /* 수정 완료 후 모든 투두는 선택된 상태가 아니어야 함으로 id를 ''로 설정 */
      i.id = '';
    }
    /* 수정된 todos를 다시 localStorage에 설정 */
    localStorage.setItem(TODOS, JSON.stringify(todos));
  } else {
    /* 수정이 아닌 투두를 추가하는 경우 */
    /* todos배열에 추가될 내용을 정리 */
    const input = {
      date: todoFullDate.innerHTML,
      title: title_,
      content: content_,
      check: false,
      selected: false,
    };
    /* 입력받은 값이 제목과 내용 모두 빈칸이 아니라면 해당 내용을 todos 배열에 추가해주고 변경된 todos를 localStorage에 설정 */
    if (title_ != '' || content_ != '') {
      todos.push(input);
      localStorage.setItem(TODOS, JSON.stringify(todos));
      /* 투두리스트에 해당 값 띄우기 */
      paint(input);
    } else {
      /* 입력받은 값이 제목과 내용 중 하나라도 빈칸이라면 알림창을 통해 다시 입력받도록 함 */
      alert('제목과 내용을 써주세요.');
    }
  }
  /* 투두를 추가 또는 수정 완료한 후 textBox의 제목 입력칸과 내용 입력칸의 내용을 다시 빈칸으로 설정 */
  todoTitle.value = '';
  todoContent.value = '';
  /* textBox의 visible을 false로 바꿈 */
  setVisibleFalse();
}

/* textBox에서 투두 추가 버튼을 눌렀을 경우 해당 투두의 제목이 투두 리스트에 추가로 띄워짐*/
function paint(input) {
  const li = document.createElement('li');
  const text = document.createElement('input');
  /* 매개변수로 받은 input의 title,check여부,selected여부를 input 요소인 text에 설정 */
  text.value = input.title;
  text.type = 'checkbox';
  text.checked = input.check;
  text.selected = input.selected;
  /* label 요소를 생성한 후 해당 label의 값을 매개변수로 받은 input의 title로 설정 및 input과 label을 연결*/
  const label = document.createElement('label');
  label.innerText = input.title;
  label.for = input.title;
  /* checkbox가 체크될 경우 해당 투두의 check를 true또는 false로 바꾸기 위해 click event에 setCheck함수를 설정*/
  text.addEventListener('click', setCheck);
  /* li type의 요소에 checkbox type의 text와 label을 추가 */
  li.appendChild(text);
  li.appendChild(label);
  /* 투두리스트에 li 추가 */
  todoList.appendChild(li);
  /* 수정이나 내용 확인을 위해 투두가 선택될 경우를 위해 setCheck함수를 click event에 설정*/
  label.addEventListener('click', setViewTodo);
}

/* 투두리스트에 있는 투두가 check되었을 경우 실행되는 함수 */
function setCheck(event) {
  /* event가 발생한 target을 searchTodoTitleValue 함수를 통해 todo에 대입 */
  const todo = searchTodoTitleValue(event.target.value);
  /* 해당 target이 발견되었을 경우 */
  if (todo != null) {
    /* 발견된 배열인 todo의 check값을 event가 발생한 target의 check여부로 바꿈 */
    todo.check = event.target.checked;
    /* todo가 변경되었기 때문에 해당 값을 localStorage에 설정 */
    localStorage.setItem(TODOS, JSON.stringify(todos));
  } else {
    /* 해당 target이 발견되지 않은 경우 */
    console.log('not found');
  }
}

/* 투두리스트에 있는 투두가 선택될 경우 해당 투두의 제목과 내용을 textBox에 보여주는 함수 */
function setViewTodo(event) {
  /* 투두리스트에 있는 모든 리스트 불러오기 */
  const allList = document.querySelectorAll(' li label');
  /* 모든 리스트의 id를 ''로 변경 - 한 투두가 선택된 상태에서 다른 투두를 선택할 경우 이전에 선택된 투두의 초기화를 위해 */
  for (let list of allList) {
    list.id = '';
  }
  /* searchTodoTitle 함수를 통해 event가 발생한 target의 title을 가진 todo를 가져옴 */
  const label = event.target;
  const todo = searchTodoTitle(label);
  /* 해당 투두가 있는 경우 */
  if (todo != null) {
    /* 투두의 selected를 반대로 변경 */
    todo.selected = !todo.selected;
    /* selected가 true인 경우 */
    if (todo.selected) {
      /* 모든 todo의 selected를 false로 변경 */
      for (let todo_ of todos) {
        todo_.selected = false;
      }
      todo.selected = true;
      /* searchTodoIndex함수를 통해 event가 발생한 target값을 가진 todo의 index값 반환 */
      selectedTodoIndex = searchTodoIndex(label);
      /* textBox를 강제로 열고 해당 투두의 제목과 내용이 입력됨 */
      setVisibleTrue();
      todoTitle.value = todo.title;
      todoContent.value = todo.content;
      /* event가 발생한 label의 id를 selectedLabel로 변경 */
      label.id = 'selectedLabel';
    } else {
      /* selected가 false인 경우 */
      /* 모든 todo의 selected를 false로 수정 */
      for (let todo_ of todos) {
        todo_.selected = false;
      }
      /* textBox를 강제로 닫고 제목과 내용 입력칸을 비움, event가 발생한 label의 id를 ''로 변경 */
      setVisibleFalse();
      label.id = '';
      todoTitle.value = '';
      todoContent.value = '';
    }
  }
}

/* label 안의 text를 todos 배열 안 todo의 title과 비교하여 일치하는 것이 있다면 해당 todo를 반환하는 함수 */
function searchTodoTitle(label) {
  for (let todo of todos) {
    if (todo.title === label.innerText) {
      return todo;
    }
  }
  return null;
}

/* searchTodoTitle의 value를 비교하는 버전 */
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
  if (todoDay === todoFullDate.innerHTML) {
    return todo;
  } else return null;
}

/* label의 값과 todos 배열의 todo의 title과 비교하여 일치하는 것이 있다면 해당 todo의 index를 반환 */
function searchTodoIndex(label) {
  let index = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].title === label) {
      index = i;
    }
  }
  return index;
}

/* 투두 삭제 버튼을 눌렀을 때 실행되는 함수 */
function deleteTodo(event) {
  event.preventDefault();
  /* 선택된 투두의 제목의 index값을 가져옴 */
  const deleteTodoTitle = todoTitle.value;
  const deleteTodoIndex = searchTodoIndex(deleteTodoTitle);
  /* todos 배열에서 index번째 값을 제거, localStorage에 변경된 todos를 설정 */
  todos.splice(deleteTodoIndex, 1);
  localStorage.setItem(TODOS, JSON.stringify(todos));
  /* 투두리스트에서 삭제된 투두는 selected된 상태였음으로 id가 selected인 투두를 찾아 해당 투두를 투두리스트에서 삭제 */
  const listLabel = document.querySelectorAll('li label');
  const list = document.querySelectorAll('li');
  for (let i = 0; i < listLabel.length; i++) {
    if (listLabel[i].id === 'selectedLabel') {
      console.log(list[i]);
      list[i].remove();
    }
  }
  /* textBox 강제로 닫음 */
  setVisibleFalse();
}

/* 투두리스트의 날짜가 변경될 경우 해당 날짜의 투두를 todos로부터 불러와 그리도록 하는 observer */
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
/* observer가 todoFullDate(투두리스트의 날짜)를 보도록 함 */
observerTodo.observe(todoFullDate, {
  subtree: true,
  characterData: true,
  childList: true,
});

deleteTodoBtn.addEventListener('click', deleteTodo);
addTodoBtn.addEventListener('click', setVisible);
saveTodoBtn.addEventListener('click', addTodo);

/* 로딩될 경우 투두리스트의 날짜에 해당하는 투두를 localStorage에 저장된 값으로부터 받아옴 */
/* 즉 해당 날짜 todo를 모아둔 배열 */
let savedTodos = localStorage.getItem(TODOS);

/* savedTodos에 저장된 todo를 투두리스트에 그리기 */
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
