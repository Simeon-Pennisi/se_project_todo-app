export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed++;
    } else if (!increment && this._completed > 0) {
      this._completed--;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total++;
    } else if (!increment && this._total > 0) {
      this._total--;
      // this._completed = this._completed - 2;
      this._completed = Math.max(0, this._completed - 2);
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
