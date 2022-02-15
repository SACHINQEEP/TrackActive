import * as model from './model.js';
import workout from './view/Workout.js';

const showWorkoutForm = function () {
  workout.renderMarkup();
};

// showWorkoutForm();

const init = function () {
  workout.renderWorkoutForm(showWorkoutForm);
};

init();
