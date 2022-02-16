const state = {
  locationData: [],
  Map: '',
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

const workout = document.querySelector('.form-container');
const showFocus = document.querySelector('.distance--focus');

const userEvent = function (showMap) {
  showMap.on('click', function (coord) {
    workout.classList.remove('hidden');
    showFocus.focus();

    submitForm(showMap);

    const { lat, lng } = coord.latlng;

    L.marker([lat, lng])
      .addTo(showMap)
      .bindPopup(
        L.popup({
          autoClose: false,
          className: 'popup--container',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  });
};

// const form = document.querySelector('#my-form');
// const showingPopup = function () {
//   form.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const mapData = state.Map;
//     console.log(mapData);

//     const { lat, lng } = mapData.latlng;

//     L.marker([lat, lng])
//       .addTo(mapData)
//       .bindPopup(
//         L.popup({
//           autoClose: false,
//           className: 'popup--container',
//         })
//       )
//       .setPopupContent('Workout')
//       .openPopup();
//   });
// };

// showingPopup();
