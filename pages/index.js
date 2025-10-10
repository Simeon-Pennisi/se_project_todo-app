import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  // handleFormSubmit: (data) => {
  //   console.log(data);
  handleFormSubmit: (evt) => {
    console.log("data");
    // console.log(evt.target.name.value);
    // console.log(evt.target.date.value);
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    todosList.append(todo);
    // closeModal(addTodoPopupElement);
    addTodoPopup.close();
  },
});

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

const generateTodo = (data, id) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

// addTodoButton.addEventListener("click", () => {
//   openModal(addTodoPopupElement);
// });

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   closeModal(addTodoPopupElement);
// });

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

addTodoPopup.setEventListeners();

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
// const name = evt.target.name.value;
// const dateInput = evt.target.date.value;

// const date = new Date(dateInput);
// date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

// const id = uuidv4();
// const values = { name, date, id };
// const todo = generateTodo(values);
// todosList.append(todo);
// closeModal(addTodoPopupElement);
// });

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
