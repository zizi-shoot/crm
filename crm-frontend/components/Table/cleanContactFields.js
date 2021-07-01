import { CONTACT_WRAPPER_CLASS } from '../global/constants.js';

export function cleanContactFields() {
  const contacts = document.querySelectorAll(`.${CONTACT_WRAPPER_CLASS[0]}`);
  contacts.forEach((contact) => contact.remove());
}
