$(document).ready(function() {
  searchWeather();
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let btnWeek = $('.weather');
  btnWeek.on('click', searchDay);

});