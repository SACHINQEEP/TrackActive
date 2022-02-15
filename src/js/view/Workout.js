class Workout {
  _parentEl = document.querySelector('.map-Container');
  _renderEL = document.querySelector('.form-container');

  renderMarkup() {
    const markup = this._markup();
    console.log('html');
    this._renderEL.insertAdjacentHTML('afterend', markup);
  }

  _markup() {
    return `

        <div class="form-container ">
        <h3>Select the Activity you have done on the selected location</h3>
        <form id="my-form">
        <div class="form form--running">
          <div class="type--label">
            <label>Type:</label>
            <select id="Activity">
              <option value="text">Running</option>
              <option value="text">Cycling</option>
            </select>
          </div>
          <div class="type--label">
            <label>Distance:</label>
            <input
              class="label--size"
              type="text"
              placeholder="Km"
              name="text"
            />
          </div>
          <div class="type--label">
            <label>Duration:</label>
            <input
              class="label--size"
              type="text"
              placeholder="Min"
              name="text"
            />
          </div>
          <div class="type--label">
            <label>Cadence:</label>
            <input
              class="label--size"
              type="text"
              placeholder="Step/min"
              name="text"
            />
          </div>
          <button class="btnsubmit" type="submit">Submit</button>
        </form>
        </div>
        `;
  }

  renderWorkoutForm(handler) {
    this._parentEl.addEventListener('click', function () {
      return handler();
    });
  }
}

export default new Workout();
