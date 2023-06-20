const weather = this.document.querySelector('#weather');
const APIKEY = 'ee24b1bf206cc7a493c7cca2d56ea8ab';

function success(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  getWeather(lat, lng);
}

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric&lang=kr`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const stringData = JSON.stringify(data);
      const legion = data.name;
      const temp = data.main.temp;
      const tempMax = data.main.temp_max;
      const tempMin = data.main.temp_min;
      const wea = data.weather[0].description;
      const humidity = data.main.humidity;
      const space = document.createElement('br');
      weather.innerHTML += legion;
      weather.innerHTML += ' ' + wea;
      weather.appendChild(space);
      weather.innerHTML += ' 습도 : ' + humidity;
      weather.appendChild(space);
      weather.innerHTML += ' 현재 온도 : ' + temp;
      weather.appendChild(space);
      weather.innerHTML += ' 최고 온도 : ' + tempMax;
      weather.appendChild(space);
      weather.innerHTML += ' 최저 온도 : ' + tempMin;
    })
    .catch((error) => {
      alert(error);
    });
}

navigator.geolocation.getCurrentPosition(success);
