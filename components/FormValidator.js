class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    console.log(this._settings);
    this.formSelector = settings.formSelector;
    (this._inputSelector = settings._inputSelector),
      (this._submitButtonSelector = settings._submitButtonSelector),
      (this._errorClass = settings._errorClass),
      (this._inputErrorClass = settings._inputErrorClass),
      (this._inactiveButtonClass = settings._inactiveButtonClass),
      console.log(this._formElement);
  }

  _setEventListeners() {
    console.log("setting event listeners");
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._formElement.addEventListener("click", (evt) => {
      evt.preventDefault();
    });
  }
}

export default FormValidator;
