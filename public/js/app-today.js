$(document).ready(function () {
  // Abrir vista today.html
  let btnOpen = $('.open-today');
  btnOpen.click(function () {
    window.location.href = 'view/today.html';
  });

  // Abrir vista week.html
  let btnOpenWeek = $('.open-week');
  btnOpenWeek.click(function () {
    window.location.href = 'week.html';
  });

  // Función para la geolocalización
  searchPosition();
  function searchPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let myPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // Proxy-agente de autorización para actuar sobre el API meteorologico
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        // url API key
        const apiLinkDS = `https://api.darksky.net/forecast/bfd18dc740bc1c995da4964a8547b03f/${myPosition.lat},${myPosition.lng}?units=si`;

        $.ajax({
          url: proxy + apiLinkDS,
          success: getWeather
        });
      });
    } else {
      console.log('Su navegador no soporta Geolocalización');
    }
  }

  // Objeto de dias
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Función para la geolocalización
  function getWeather(data) {
    let imgWeather = $('.icon-weather');
    let contentWeek = $('#content-week');
    let temperature = $('.temperature');
    let wind = $('#wind');
    let humidity = $('#humidity');
    let uvIndex = $('#uv-index');
    let pressure = $('#pressure');
    let summary = $('#summary');
    let responseToday = data.currently;
    let responseWeek = data.daily.data;
    let icon = responseToday.icon;
    console.log(responseToday);
    // Reemplazamos por los valores de la data para la vista today
    temperature.text(responseToday.temperature + '°');
    wind.text(responseToday.windSpeed + 'm/s');
    humidity.text(responseToday.humidity + '%');
    uvIndex.text(responseToday.uvIndex);
    pressure.text(responseToday.pressure + 'hPa');
    summary.text(responseToday.summary);
    // Iconos del clima
    imgWeather.attr('src', `../assets/images/${responseToday.icon}.png`);
    // result week
    let daysWeather = responseWeek.slice(0, 7);

    daysWeather.forEach((element, index) => {
      let modelTemplate = `<div class = "row">
      <div class="col-2"><img class="w100" src="../assets/images/${element.icon}.png"></div>
      <div class="col-5"><p class="font-1">${days[index]}</p></div>
      <div class="col-2"><p class="font-1">${element.temperatureMin}°</p></div>
      <div class="col-2"><p class="font-1">${element.temperatureMax}°</p></div>
      </div>`;
      contentWeek.append(modelTemplate);
    });
  }
});