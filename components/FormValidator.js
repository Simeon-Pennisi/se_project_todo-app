class FormValidator {
  constructor(validationConfig, inputElement) {
    this._validationConfig = validationConfig;
    this._inputElement = inputElement;

    // private method to check field validity
    this._isValid = (inputElement, errorElement) => {
      if (!inputElement.validity.valid) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.classList.add(this._validationConfig.errorClass);
        console.log("invalid input");
      } else {
        errorElement.textContent = "";
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        console.log("valid input");
      }
    };
    // private method to change state of submit button
    this._toggleButtonState = (inputList, buttonElement) => {
      if (inputList.some((inputElement) => !inputElement.validity.valid)) {
        buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
        console.log("button disabled");
      }
    };
    // public method to enable validation
    this.enableValidation = () => {
      const inputList = Array.from(
        this._inputElement.querySelectorAll(
          this._validationConfig.inputSelector
        )
      );
      const buttonElement = this._inputElement.querySelector(
        this._validationConfig.submitButtonSelector
      );
      // set initial state of button
      this._toggleButtonState(inputList, buttonElement);
      console.log("initial button state set");
    };

    //   create settings object to pass to the FormValidator class
    // const validationConfig = {
    //   formSelector: ".modal__form",
    //   inputSelector: ".modal__input",
    //   submitButtonSelector: ".modal__button",
    //   errorClass: "modal__error_visible",
    //   inputErrorClass: "modal__input_type_error",
    //   inactiveButtonClass: "button_disabled",
    // };
  }
}

export default FormValidator;
