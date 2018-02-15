$(document).ready(function() {
  searchWeather();
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let btnWeek = $('.weather');
  btnWeek.on('click', searchDay);

  function getWeather(data) {
    let weatherWeek = $('.icon-weather');
    let week = $('#container-days');
    let dayResponse = data.currently;
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
});