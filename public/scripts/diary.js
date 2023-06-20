let diaryList = [];

const saveDiaryBtn = document.querySelector('#saveDiaryBtn');

function saveDiary() {
  const date = document.querySelector('#diary-date').innerText;
  const text = document.querySelector('#diaryTextForm').value;
  const emotion = document.querySelector('#mood').value;

  let foundDate = searchDiaryByDate();
  let url;
  if (foundDate != null) {
    foundDate.diary = text;
    foundDate.emotion = emotion; 
    url = '/updateDiary';
  } else {
    diaryList.push({
      date: date,
      diary: text,
      emotion: emotion,
    });
    url = '/addDiary';
  }
  /* API연결 필요 */
  $.ajax({
    method: 'POST',
    url: url,
    data: {
      date: date,
      diary: text,
      emotion: emotion,
    }
  }).done(function (res) {
    
  }).fail(function (jqXHR, textStatus, errorThrown) {
    
  });

  /* diary 및 기분 저장 */
  localStorage.setItem('diaryList', JSON.stringify(diaryList));

  setBananaIcon(date);
}
saveDiaryBtn.addEventListener('click', saveDiary);

function searchDiaryByDate() {
  const date = document.querySelector('#diary-date');
  for (let i = 0; i < diaryList.length; i++) {
    if (diaryList[i].date === date.innerText) {
      return diaryList[i];
    }
  }
  return null;
}

const observerDiary = new MutationObserver(function () {
  const text = document.querySelector('#diaryTextForm');
  if (searchDiaryByDate() != null) {
    text.value = searchDiaryByDate().diary;
    selectMood(searchDiaryByDate().emotion);
  } else {
    text.value = '';
    selectMood('happy');
  }
  //console.log(text.value);
});

observerDiary.observe(document.querySelector('#diary-date'), {
  subtree: true,
  characterData: true,
  childList: true,
});

/* API연결 필요 */
/* 처음 로딩시 저장된 diary가 있다면 출력 */
const savedDiary = localStorage.getItem('diaryList');

const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));
if (parsedDiary != null) diaryList = parsedDiary;
if (searchDiaryByDate() != null) {
  const text = document.querySelector('#diaryTextForm');
  text.innerHTML = searchDiaryByDate().diary;
}

function selectMood(selectedMood) {
  var select = document.getElementById('mood');

  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].value == selectedMood) {
      select.selectedIndex = i;
      break;
    }
  }
}
