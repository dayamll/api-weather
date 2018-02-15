$(document).ready(function () {
  searchWeather();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let btnWeek = $('.weather');
  btnWeek.on('click', searchDay);

  function getWeather(data) {
    // Para days.html
    let weatherWeek = $('.icon-weather');
    let wind = $('#wind');
    let humidity = $('#humidity');
    let uvIndex = $('#uv-index');
    let pressure = $('#pressure');
    let summary = $('#summary');
    let dayResponse = data.currently;
    let icon = dayResponse.icon;
    console.log(dayResponse);
    temperature.text(dayResponse.temperature + '°');
    wind.text(dayResponse.windSpeed + 'm/s');
    humidity.text(dayResponse.humidity + '%');
    uvIndex.text(dayResponse.uvIndex);
    pressure.text(dayResponse.pressure + 'hPa');
    summary.text(dayResponse.summary);


    let responseWeek = data.daily.data;

    let week = $('#container-days');

    let weekResponse = data.daily.data;
    let iconWeather = dayResponse.icon;

    weatherWeek.attr('src', `assets/images/${dayResponse.icon}.png`);
    let daysWeather = weekResponse.slice(0, 7);

    daysWeather.forEach((element, index) => {
      let model = `<div class = "row">
      <div class="col-3"><img class="w100" src="../assets/images/${element.icon}.png"></div>
      <div class="col-3"><p>${days[index]}</p></div>
      <div class="col-3"><p>${element.temperatureMin}°</p></div>
      <div class="col-3"><p>${element.temperatureMax}°</p></div>
      </div>`;
      week.append(model);
    });
  }
  // Geolocation
  function searchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let myPosition = {
          lng: position.coords.longitude,
          lat: position.coords.latitude
        };

        var apiLinkDS = `https://api.darksky.net/forecast/b55bd126b917d17d590e4e7f025aaccb/${myPosition.lat},${myPosition.lng}?units=si`;
        var proxy = 'https://cors-anywhere.herokuapp.com/';

        $.ajax({
          url: proxy + apiLinkDS,
          success: getWeather
        });
      });
    } else {
      console.log('Existe un error en el sistema');
    }
  }

  function searchDay() {
    window.location.href = 'view/days.html';
  }
});