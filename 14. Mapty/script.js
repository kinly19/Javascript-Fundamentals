'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {

  // Using js classfield
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor (coords, distance, duration) {

    // Without js classfield
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Running extends Workout {
  // Constructor should take in the same args as the parent it extends
  constructor(coords, distance, duration, cadence) {
    // Using the parents constructor
    super(coords, distance, duration);
    this.cadence = cadence;
    // Using constructor to immediately calculate the pace
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  // Private properties
  #map;
  #mapEvent;

  constructor() {
    // Get current position
    this._getPosition();

    // Form submit handler
    form.addEventListener('submit', this._newWorkOut.bind(this));

    // Form input toggle handler
    inputType.addEventListener('change', this._toggleElevationField); // Does not need 'this' keyword
  }

  // Methods
  _getPosition() {
    if (navigator.geolocation) {
      // Get users position & load map
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert('Could not get your position');
      });
    }
  }

  _loadMap(position) {
    // Get user position
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    // Show user position
    this.#map = L.map('map').setView(coords, 15);

    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Initial Leaflet location marker
    L.marker(coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent('You Are Here')
      .openPopup();

    // maps click event for showing form
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    // Show form
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  // Input form toggle
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    e.preventDefault();

    // New marker coords
    const { lat, lng } = this.#mapEvent.latlng;

    // Add new marker (Leaflet library)
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();

    // Clears input fields
    this._clearInputs();
  }

  _clearInputs() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }
}

const app = new App();