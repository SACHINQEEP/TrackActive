const formContent = document.querySelector('.form-container');
const showFocus = document.querySelector('.distance--focus');
const subForm = document.querySelector('#my-form');
const showWorkout = document.querySelector('.workout--content');

class App {
  _Map;
  _coord;
  popupEvent;

  constructor() {
    this._getLocation();

    subForm.addEventListener('submit', this._newWorkout.bind(this));
  }

  _getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('!could not fond yoru location');
        }
      );
    }
  }

  _loadMap(position) {
    console.log(position);

    const { latitude, longitude } = position.coords;

    this._coord = [latitude, longitude];

    this._Map = L.map('map', { closePopupOnClick: false }).setView(
      this._coord,
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._Map);

    this._Map.on('click', this._showForm.bind(this));
  }

  _showForm(el) {
    this._popupEvent = el;
    formContent.classList.remove('hidden');
    showFocus.focus();
  }

  _showPopup() {
    const { lat, lng } = this._popupEvent.latlng;
    console.log(lat, lng);

    L.marker([lat, lng])
      .addTo(this._Map)
      .bindPopup(
        L.popup({
          autoClose: false,
          className: 'popup--container',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }

  _newWorkout(e) {
    e.preventDefault();
    this._showPopup();
    this._renderWorkout();
  }

  _renderWorkout() {
    const html = `
            <div class="workout running--container workout--running">
              <h3>Running on February 12</h3>
              <div class="workout--details">
                <img src="./src/imgs/persion-running.svg" alt="Icon" />
                <span>2 Km</span>
                <img src="./src/imgs/stopwatch.svg" alt="Icon" />
                <span>5 Min</span>
                <img src="./src/imgs/speed-icon.svg" alt="Icon" />
                <span>2 Min/Km</span>
                <img src="./src/imgs/foot-icon.svg" alt="Icon" />
                <span>20 SPM</span>
              </div>
            </div>
            <div class="bg--green styling--workout"></div>
          </div>
    `;
    showWorkout.insertAdjacentHTML('afterbegin', html);
  }
}

const newWorkout = new App();
