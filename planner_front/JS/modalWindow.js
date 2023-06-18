function showModal(date) {
    const modal = document.getElementById('modal');
    const modalDate = document.getElementById('modal-date');
    const modalInfo1 = document.getElementById('modal-info-1');

    modalDate.textContent = date.toDateString();
    modalInfo1.textContent = '세부 내용 페이지.'; 

    modal.style.display = 'block';

    
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.onclick = function () {
        modal.style.display = 'none';
    };
    window.onclick = function (event) {
        if (event.target == modal) {
        modal.style.display = 'none';
        }
    };
}

function diaryInfo(dayDiv){
    const page2 = document.getElementById('modal-page2');

    const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));

    let diaryText = "";

    for (let pdiary of parsedDiary) {
        if(dayDiv.innerText.split("\n")[0] == parseInt(pdiary.date.split(' ')[2])){
            diaryText = pdiary.diary;
        }
    }
    page2.innerText = diaryText;
    page2.classList.add('modal-page123');
    if(page2.innerText == ""){
        page2.innerText = "작성한 Diary가 없습니다."
    }
}

function todoListInfo(dayDiv){
    const page1 = document.getElementById('modal-page1');

    let todoCount = 0;
    let checkCount = 0;
    let todoBox = "";

    const parsedToDos = JSON.parse(localStorage.getItem(TODOS));
    for (let todo of parsedToDos) {
        if (dayDiv.innerText.split("\n")[0] == parseInt(todo.date.split(' ')[2])) {
            todoCount++;
            todoBox += `  ${todoCount}) `;
            todoBox += todo.title;
            todoBox += `<br>`;
        }
    }
    page1.innerHTML = todoBox;
    page1.classList.add('modal-page123');
    if(page1.innerText == ""){
        page1.innerText = "작성한 todo가 없습니다."
    }
}

function achievementInfo(dayDiv){
    const page3 = document.getElementById('modal-page3');

    let todoCount = 0;
    let checkCount = 0;

    const parsedToDos = JSON.parse(localStorage.getItem(TODOS));
    for (let todo of parsedToDos) {
        if(dayDiv.innerText.split("\n")[0] == parseInt(todo.date.split(' ')[2])){
            todoCount++;
            if(todo.check){
                checkCount++;
            }
        }
    }
    page3.innerText = `달성율: ${((checkCount/todoCount)*100).toFixed(2)}%`;
    page3.classList.add('modal-page123');
    if(page3.innerText.indexOf("NaN") > 0){
        page3.innerText = "달성할 수 있는 todo가 없습니다."
    }
}