'use strict';

const formContent = document.querySelector('.form-container');
const showFocus = document.querySelector('.distance--focus');
const subForm = document.querySelector('#my-form');

class Workout {
  _date = new Date();
  _saveDate;
  constructor(distance, duration) {
    this.distance = distance;
    this.duration = duration;

    this.getDate();
  }
  // Running on February 12
  getDate() {
    const option = {
      month: 'long',
      day: '2-digit',
    };
    this.discription = new Intl.DateTimeFormat('en-IN', option).format(
      this._date
    );

    this._saveDate = this.discription;
    console.log(this._saveDate);
  }

  showDiscription(type) {
    console.log(type);
    this.renderDiscription = `${type.toUpperCase()} on ${this._saveDate}`;
    console.log(this.renderDiscription);
  }
}

class Running extends Workout {
  type = 'running';

  constructor(distance, duration, cadence) {
    super(distance, duration);
    this.cadence = cadence;
    this.showDiscription(this.type);
    this._calcPace();
  }

  _calcPace() {
    this.pace = this.distance / this.duration;
    console.log(this.pace);
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, elevationGain) {
    super(distance, duration);
    this.elevationGain = elevationGain;
    this.showDiscription(this.type);
    this._calcSpeed();
  }

  _calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
  }
}

const showWorkout = document.querySelector('.workout--content');
const toogleActive = document.querySelector('.activity');
const distanceEl = document.getElementById('distance');
const durationEl = document.getElementById('duration');
const cadenceEl = document.getElementById('cadence');
const elevationEl = document.getElementById('elevationGain');
const focusClear = document.querySelector('.type--label');

class App {
  _Map;
  _coord;
  popupEvent;
  _date = new Date();
  #workouts = [];

  constructor() {
    this._getLocation();

    toogleActive.addEventListener('change', this._changeWorkout.bind(this));

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

    let workout;

    if (type === 'running') {
      const cadence = +cadenceEl.value;

      if (
        !allPositive(cadence, distance, duration) &&
        !allNumber(cadence, distance, duration)
      )
        alert(`!Please put some number in the input field`);

      workout = new Running(cadence, distance, duration);
    }

    if (type === 'cycling') {
      const elevation = +elevationGain.value;

      if (
        !allPositive(elevation, distance, duration) &&
        !allNumber(distance, duration)
      )
        alert(`!Please put some number in the input field`);

      workout = new Cycling(elevation, distance, duration);
    }

    this._storingWorkout(workout);

    this._clearField();

    this._showPopup();
    this._renderWorkout(workout);
  }

  _storingWorkout(workout) {
    this.#workouts.push(workout);

    console.log(this.#workouts);
  }

  _clearField() {
    distanceEl.value =
      durationEl.value =
      elevationEl.value =
      cadenceEl.value =
        '';
  }

  _changeWorkout() {
    cadenceEl.closest('.form--row').classList.toggle('form--hidden');
    elevationEl.closest('.form--row').classList.toggle('form--hidden');
  }

  _renderWorkout(workout) {
    const html = `
            <div class="workout running--container workout--${
              workout.type === 'running' ? 'running' : 'cycling'
            }">
              <h3>${workout.type} ${workout.discription}</h3>
              <div class="workout--details">
                <${
                  workout.type === 'running'
                    ? 'img src="./src/imgs/persion-running.svg" alt="Icon"'
                    : 'img src="./src/imgs/Cycling-icon.svg" alt="Icon"'
                } />
                <span>${
                  workout.type === 'running'
                    ? workout.distance
                    : workout.distance
                } Km</span>
                <img src="./src/imgs/stopwatch.svg" alt="Icon" />
                <span>${workout.duration} Min</span>
                <img src="./src/imgs/speed-icon.svg" alt="Icon" />
                <span>${
                  workout.type === 'running' ? workout.pace : workout.speed
                } Min/Km</span>
                <${
                  workout.type === 'running'
                    ? 'img src="./src/imgs/foot-icon.svg" alt="Icon"'
                    : 'img src="./src/imgs/elevation-rise.svg" alt="Icon"'
                } />
                <span>${
                  workout.type === 'running'
                    ? workout.cadence
                    : workout.elevationGain
                } SPM</span>
              </div>
            </div>
          </div>
    `;
    showWorkout.insertAdjacentHTML('afterbegin', html);
    console.log(workout);
  }
}

const newWorkout = new App();
