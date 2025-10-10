class Todo {
  constructor(data, selector, handleCompleted, handleTotal) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCompleted = handleCompleted;
    this._handleTotal = handleTotal;
    this._completed = data.completed;
  }

  _setEventListeners() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = todoCheckboxEl.checked;
      this._toggleCompletion();
      this._handleCompleted(this._completed);
    });
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleCompleted(this._completed);
      this._handleTotal(this._total);
    });
  }

  _generateTodoCheckboxEl() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDueDate() {
    const todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateTodoCheckboxEl();
    this._setEventListeners();
    this._generateDueDate();
    return this._todoElement;
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };
}

export default Todo;
