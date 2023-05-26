let diaryList = [];

const saveDiaryBtn = document.querySelector('#saveDiaryBtn');

function saveDiary() {
  const date = document.querySelector('#diary-date').innerText;
  const text = document.querySelector('#diaryTextForm').value;
  let foundDate = searchDiaryByDate();
  if (foundDate != null) {
    foundDate.diary = text;
  } else {
    diaryList.push({
      date: date,
      diary: text,
    });
  }
  localStorage.setItem('diaryList', JSON.stringify(diaryList));
  console.log('저장되었습니다.');
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
    console.log('found');
  } else {
    text.value = '';
    console.log('Nor found');
  }
  console.log(text.value);
});

observerDiary.observe(document.querySelector('#diary-date'), {
  subtree: true,
  characterData: true,
  childList: true,
});

const savedDiary = localStorage.getItem('diaryList');

const parsedDiary = JSON.parse(localStorage.getItem('diaryList'));
if (parsedDiary != null) diaryList = parsedDiary;
if (searchDiaryByDate() != null) {
  const text = document.querySelector('#diaryTextForm');
  text.innerHTML = searchDiaryByDate().diary;
}
