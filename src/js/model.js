export const state = {
  locationData: [],
};

console.log(state);

const location = function (postion) {
  const data = postion;

  const { latitude, longitude } = data.coords;

  return {
    lat: latitude,
    long: longitude,
  };
};

const getLocation = function () {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      state.locationData = location(position);
      console.log(state.locationData);
      loadMap();
    },
    function () {
      alert('!Could not found your location');
    }
  );
};

getLocation();

const loadMap = function () {
  const locationLat = state.locationData.lat;
  const locationLong = state.locationData.long;

  const map = L.map('map', { closePopupOnClick: false }).setView(
    [locationLat, locationLong],
    13
  );

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  userEvent(map);
};

const userEvent = function (showMap) {
  showMap.on('click', function (coord) {
    const { lat, lng } = coord.latlng;

    L.marker([lat, lng])
      .addTo(showMap)
      .bindPopup('Running on February 12')
      .openPopup();
  });
};

// const workout = document.querySelector('.form-container');
// const clickOn = document.querySelector('.map-Container');

// const renderWorkoutForm = function () {
//   clickOn.addEventListener('click', function (e) {
//     e.preventDefault();
//     workout.classList.remove('hidden');
//   });
// };

// renderWorkoutForm();
