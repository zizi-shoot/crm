import { EDIT_MODAL_LASTNAME_ID, EDIT_MODAL_NAME_ID, EDIT_MODAL_SURNAME_ID } from '../global/constants.js';

export function insertClientName({ name, surname, lastName }) {
  const nameInput = document.getElementById(EDIT_MODAL_NAME_ID);
  const surNameInput = document.getElementById(EDIT_MODAL_SURNAME_ID);
  const lastNameInput = document.getElementById(EDIT_MODAL_LASTNAME_ID);
  nameInput.value = name;
  surNameInput.value = surname;
  lastNameInput.value = lastName;
}
