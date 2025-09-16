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
  enableValidation() {
    const { inputSelector, submitButtonSelector } = this._settings;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(submitButtonSelector);
    this._setEventListeners();
  }
}

export default FormValidator;
