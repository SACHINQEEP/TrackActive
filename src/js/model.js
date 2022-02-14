export const state = {
  lat: '',
  long: '',
};

console.log(state);

const getLocation = function () {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      state.lat = latitude;
      state.long = longitude;
    },
    function () {
      alert('!Could not found your location');
    }
  );
};

getLocation();

export const loadMap = function () {
  var map = L.map('map').setView([51.5, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
};
