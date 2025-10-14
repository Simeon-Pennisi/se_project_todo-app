import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// this is the basis for the renderer function in Section.js
const generateTodo = (data, id) => {
  const todo = new Todo(data, "#todo-template", handleCompleted, handleTotal);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    // initialTodos.forEach((item) => {
    const todo = generateTodo(item);
    // todosList.append(todo);
    section.addItem(todo);
    todoCounter.updateTotal();
    // });
  },
  containerSelector: ".todos__list",
});

// call renderItems to render initial items
section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    // this will be replaced by addItem function in Section.js
    const values = { name, date, id };
    const todo = generateTodo(values);
    // todosList.append(todo);
    // replace the line above with addItem function in Section.js
    section.addItem(todo);
    todoCounter.updateTotal();
    addTodoPopup.close();
  },
});

function handleCompleted(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTotal() {
  todoCounter.updateTotal();
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoPopup.setEventListeners();

// initialTodos.forEach((item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// });

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoForm.addEventListener("submit", () => {
  formValidator.resetValidation();
  addTodoForm.reset();
});
