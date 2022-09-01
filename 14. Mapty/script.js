'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  type = "running";

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
  type = "cycling";
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

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  // Private properties
  #map;
  #mapEvent;
  #workouts = [];

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

    // Helper function
    const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If activity is 'Running' create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        !validInput(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('All inputs have to be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If activity is 'Cycling' create clycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInput(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('All Inputs have to be positive numbers');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout to map as a marker
    this._renderWorkoutMarker(workout)

    // Render workout on list

    // Hide form and clear inputs
    this._clearInputs();
  }

  _clearInputs() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }

  _renderWorkoutMarker(workout) {
    // Add new marker to map
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
          // className: type === "running" ? "running-popup" : "cycling-popup",
        })
      )
      .setPopupContent(`${workout.type}`)
      .openPopup();

      console.log(workout);
  }
}

const app = new App();