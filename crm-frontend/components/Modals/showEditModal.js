import { ACTION_LOADING_CLASS, CONTACT_ADD_CLASS, EDIT_MODAL_DELETE_BTN_CLASS, EDIT_MODAL_ID, EDIT_MODAL_ID_CLASS } from '../global/constants.js';
import { getClientData } from '../api/getClientData.js';
import { createContactField } from './createContactField.js';
import { insertClientName } from './insertClientName.js';

export function showEditModal(id, target) {
  const element = document.getElementById(id);
  const clientId = document.querySelector(`.${EDIT_MODAL_ID_CLASS}`);
  const editForm = document.forms['edit-client'];
  const addContactBtn = document.querySelector(`#${EDIT_MODAL_ID} .${CONTACT_ADD_CLASS}`);
  const deleteClientBtn = document.querySelector(`#${EDIT_MODAL_ID} .${EDIT_MODAL_DELETE_BTN_CLASS}`);
  // eslint-disable-next-line no-undef
  const modal = new bootstrap.Modal(document.getElementById(EDIT_MODAL_ID));

  deleteClientBtn.dataset.id = id;
  editForm.dataset.id = id;
  clientId.innerText = `ID: ${id}`;
  element.id = `_${id}`;
  window.location.hash = id;
  element.id = id;

  getClientData(id)
    .then((data) => {
      data.contacts.forEach((contact) => addContactBtn.before(createContactField(contact)));
      return data;
    })
    .then((data) => insertClientName(data))
    .then(() => modal.show())
    .then(() => {
      if (target) target.classList.remove(ACTION_LOADING_CLASS);
    });
}
