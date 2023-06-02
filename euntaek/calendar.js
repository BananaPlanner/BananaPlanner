let currentDate = new Date();
let selectedDay = null;

function loadCalendar(date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let calendar = document.getElementById('calendar');
    let displayBox = document.getElementById('displayBox');

    let calendarHtml = "";

    dayNames.forEach(day => {
        calendarHtml += `<div class='weekday'>${day}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
        calendarHtml += `<div class='day'>&nbsp;</div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
        calendarHtml += `<div class='day'>${i}</div>`;
    }

    calendar.innerHTML = calendarHtml;

    calendar.addEventListener('click', function(e) {
        if(e.target.className === 'day' && e.target.innerText !== '') {
            displayBox.innerText = `${year}-${month + 1}-${e.target.innerText}`;
        }
    });

    let dayDivs = calendar.getElementsByClassName('day');
    for (let i = 0; i < dayDivs.length; i++) {
        dayDivs[i].addEventListener('click', function(e) {
            if(selectedDay !== null) {
                selectedDay.style.backgroundColor = '';
            }
            selectedDay = e.target;
            selectedDay.style.backgroundColor = 'yellow';
            displayBox.innerText = `${year}-${month + 1}-${e.target.innerText}`;
        });
    }

    document.getElementById('monthYearDisplay').innerText = `${year} - ${month + 1}`;
}

window.onload = function() {
    loadCalendar(currentDate);

    document.getElementById('nextButton').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        loadCalendar(currentDate);
    });

    document.getElementById('prevButton').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        loadCalendar(currentDate);
    });

    let dayDivs = document.getElementsByClassName('day');
    for (let i = 0; i < dayDivs.length; i++) {
        dayDivs[i].addEventListener('click', function(e) {
            if(selectedDay !== null) {
                selectedDay.style.backgroundColor = '';
            }
            selectedDay = e.target;
            selectedDay.style.backgroundColor = 'yellow';

            let dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${e.target.innerText.split("\n")[0]}`;

            document.getElementById('displayBox').innerText = dateString;
        });
    }
}