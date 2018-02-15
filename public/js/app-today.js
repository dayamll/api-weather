$(document).ready(function () {
  // Abrir vista today.html
  let btnOpen = $('.open-today');
  btnOpen.click(function () {
    window.location.href = 'view/today.html';
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
});