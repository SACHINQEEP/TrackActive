'use strict';

const formContent = document.querySelector('.form-container');
const showFocus = document.querySelector('.distance--focus');
const subForm = document.querySelector('#my-form');

class Workout {
  // _date = new Date();
  constructor(distance, duration) {
    this.distance = distance;
    this.duration = duration;

    this.getDate();
  }
  // Running on February 12
  getDate() {
    const day = new Date();
    console.log(day);

    const option = {
      month: 'long',
      day: '2-digit',
    };
    const discription = new Intl.DateTimeFormat('en-IN', option).format(day);

    console.log(discription);
  }

  showDiscription() {
    this.renderDiscription = `${this.type
      .toUpperCase()
      .slice(1)
      .toLowerCase()} on ${this.getDate}`;
  }
}

class Running extends Workout {
  type = 'Running';
  constructor(distance, duration, cadence) {
    super(distance, duration);
    this.cadence = cadence;
    this.showDiscription();
    this._calcPace();
  }

  _calcPace() {
    this.pace = this.distance / this.duration;
    console.log(this.pace);
  }
}

class Cycling extends Workout {
  type = 'Cycling';
  constructor(distance, duration, elevationGain) {
    super(distance, duration);
    this.elevationGain = elevationGain;
    this.showDiscription();
    this._calcSpeed();
  }

  _calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
  }
}

const showWorkout = document.querySelector('.workout--content');
const toogleActive = document.getElementById('Activity');
const distanceEl = document.getElementById('distance');
const durationEl = document.getElementById('duration');
const cadenceEl = document.getElementById('cadence');

class App {
  _Map;
  _coord;
  popupEvent;
  _date = new Date();
  _workouts = [];
  _workout;

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

    const allPositive = (...inputValue) => inputValue.every(el => el > 0);
    const allNumber = (...inputValue) =>
      inputValue.every(el => Number.isFinite(el));

    const type = toogleActive.value;
    const distance = +distanceEl.value;
    const duration = +durationEl.value;
    let cadence;

    console.log(allPositive(distance, duration), allNumber(distance, duration));

    if (type === 'Running') {
      const cadence = +cadenceEl.value;

      if (
        !allNumber(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        // return alert('Input have to be positive numbers!');

        this._workout = new Running(distance, duration, cadence);
    }
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
