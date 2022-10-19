"use strict";

const formField = document.querySelector(".main__form");
const inputEmail = document.querySelector(".form__email");
const allInputFields = document.querySelectorAll(".form-input");
const allErrorMessages = document.querySelectorAll("[data-status]");

const btnTry = document.querySelector(".form__try-btn");
const btnClaim = document.querySelector(".form__claim-btn");

let wasClicked = false;

const checkEmail = function (email) {
  const words = email.replaceAll("@", ".").split(".");
  let wrongMail;
  if (words.length !== 3) {
    wrongMail = getWrongIndex(allErrorMessages, inputEmail);
    wrongMail.dataset.status = "visible";
    inputEmail.classList.add("form-input--wrong");
  }
};

const getWrongIndex = function (allErrorMessages, inputField) {
  return Array.from(allErrorMessages)[inputField.dataset.index];
};

const checkEmptyInput = function (inputFields) {
  let wrongInput;

  inputFields.forEach((field) => {
    if (field.value.trim() === "") {
      field.classList.add("form-input--wrong");
      wrongInput = getWrongIndex(allErrorMessages, field);
      wrongInput.dataset.status = "visible";
    }
  });
};

const checkCorrectInput = function (inputFieldsArr) {
  let correctInput;

  inputFieldsArr.forEach((field) => {
    if (field.value.trim() !== "") {
      field.classList.remove("form-input--wrong");
      correctInput = getWrongIndex(allErrorMessages, field);
      correctInput.dataset.status = "hidden";
    }
  });
};

btnClaim.addEventListener("click", function (e) {
  checkCorrectInput(allInputFields);
  checkEmptyInput(allInputFields);
  checkEmail(inputEmail.value);
  wasClicked = true;
});

formField.addEventListener("keyup", function (e) {
  if (e.target.classList.contains("form-input") && wasClicked) {
    checkCorrectInput(allInputFields);
    checkEmptyInput(allInputFields);
  }
});
