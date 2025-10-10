import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    todosList.append(todo);
    addTodoPopup.close();
  },
});

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

function handleCompleted(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTotal() {
  todoCounter.updateTotal();
}

const generateTodo = (data, id) => {
  const todo = new Todo(data, "#todo-template", handleCompleted, handleTotal);
  const todoElement = todo.getView();
  return todoElement;
};
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoPopup.setEventListeners();

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoForm.addEventListener("submit", () => {
  formValidator.resetValidation();
  addTodoForm.reset();
});
