import { capitalize } from '../helpers/capitalize.js';
import { CONTACT_INPUT_ERROR_CLASS, MODAL_ERRORS_CLASS, MODAL_ERRORS_HIDDEN_CLASS, MODAL_NAME_ERROR_CLASS } from '../global/constants.js';

export function validateForm(form) {
  const name = capitalize(form.name.value.trim());
  const surname = capitalize(form.surname.value.trim());
  const contacts = [];
  const contactsValues = form['contact-value'];
  const errorsList = form.querySelector(`.${MODAL_ERRORS_CLASS}`);
  let validation = true;

  while (errorsList.firstChild) errorsList.firstChild.remove();

  if (!surname) {
    form.surname.classList.add(MODAL_NAME_ERROR_CLASS);
    const errorItem = document.createElement('li');

    errorItem.innerText = 'Не заполненa фамилия';
    errorsList.append(errorItem);
    validation = false;
  }

  if (!name) {
    form.name.classList.add(MODAL_NAME_ERROR_CLASS);
    const errorItem = document.createElement('li');

    errorItem.innerText = 'Не заполнено имя';
    errorsList.append(errorItem);
    validation = false;
  }

  if (contactsValues) {
    if (!contactsValues.length) {
      contacts.push(contactsValues.value.trim());
    } else {
      contactsValues.forEach((item) => contacts.push(item.value.trim()));
    }
    if (contacts.some((item) => !item)) {
      contacts.forEach((item, index) => {
        if (!item) {
          if (!contactsValues.length) {
            contactsValues.classList.add(CONTACT_INPUT_ERROR_CLASS);
          } else {
            contactsValues[index].classList.add(CONTACT_INPUT_ERROR_CLASS);
          }
          validation = false;
        }
      });
      const errorItem = document.createElement('li');

      errorItem.innerText = 'Не заполнены контакты';
      errorsList.append(errorItem);
    }
  }
  if (!validation) errorsList.classList.remove(MODAL_ERRORS_HIDDEN_CLASS);

  return validation;
}
