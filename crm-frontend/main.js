import { ADD_CLIENT_BTN_CLASS, CONTACT_ADD_CLASS, CONTACT_INPUT_CLASS, CONTACT_INPUT_ERROR_CLASS, CONTACT_WRAPPER_CLASS, DELETE_CONFIRM_MODAL_ID, EDIT_MODAL_DELETE_BTN_CLASS, EDIT_MODAL_ID, FORM_LOADING_CLASS, HEADER_WRAPPER_CLASS, HIGHLIGHTED_ROW_CLASS, MODAL_CLASS, MODAL_CONFIRM_BTN_CLASS, MODAL_CONTACT_TYPE_SELECT_CLASS, MODAL_CONTENT_CLASS, MODAL_ERRORS_CLASS, MODAL_LOADING_CLASS, MODAL_NAME_ERROR_CLASS, MODAL_WRAPPER_CLASS, NEW_MODAL_ID, SEARCH_CLASS, SUGGESTION_CLASS, SUGGESTION_HIGHLIGHTED_CLASS, SUGGESTIONS_HIDDEN_CLASS, TABLE_BODY_CLASS, TABLE_BODY_LOADING_CLASS, TABLE_HEADER_CLASS, TABLE_SORT_CLASS } from './components/global/constants.js';
import { showSuggestions, suggestions } from './components/Header/index.js';
import { addClient, deleteClient, editClient, getClients } from './components/api/index.js';
import { createContactField, errorHandler, hideModal, showEditModal, validateForm } from './components/Modals/index.js';
import { changeSortBtns, cleanContactFields, renderTable, sortTable } from './components/Table/index.js';

const tableHead = document.querySelector(`.${TABLE_HEADER_CLASS}`);
const searchInput = document.querySelector(`.${SEARCH_CLASS}`);
const addContactFieldBtn = document.querySelectorAll(`.${CONTACT_ADD_CLASS}`);
const addClientBtn = document.querySelector(`.${ADD_CLIENT_BTN_CLASS}`);
const modalWrapper = document.querySelector(`.${MODAL_WRAPPER_CLASS}`);
const modalConfirmDelete = document.getElementById(DELETE_CONFIRM_MODAL_ID);
const editModalDeleteBtn = document.querySelector(`#${EDIT_MODAL_ID} .${EDIT_MODAL_DELETE_BTN_CLASS}`);
const headerWrapper = document.querySelector(`.${HEADER_WRAPPER_CLASS}`);
const tableBody = document.querySelector(`.${TABLE_BODY_CLASS}`);

/**
 * Стартовая отрисовка таблицы
 */

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getClients();
  tableBody.classList.remove(TABLE_BODY_LOADING_CLASS);
  renderTable(tableBody, data);
  if (window.location.hash) {
    showEditModal(window.location.hash.slice(1));
  }
});

/**
 * Обработчик сортировки таблицы
 */

tableHead.addEventListener('click', (event) => {
  if (event.target.classList.contains(TABLE_SORT_CLASS)) {
    const sortBtns = document.querySelectorAll(`.${TABLE_SORT_CLASS}`);

    changeSortBtns(sortBtns, event.target);
    sortTable(tableBody, event.target);
  }
});

/**
 * Поиск в таблице
 */

let intervalId = null;

searchInput.addEventListener('input', (event) => {
  clearInterval(intervalId);
  const target = event.currentTarget;
  intervalId = setTimeout(async () => {
    target.closest('form').classList.add(FORM_LOADING_CLASS);

    const data = await getClients(target.value);

    target.closest('form').classList.remove(FORM_LOADING_CLASS);
    showSuggestions(data);
    if (!target.value.length) {
      suggestions.classList.add(SUGGESTIONS_HIDDEN_CLASS);
    }
  }, 300);
});

/**
 * Обработчик стрелок на клавиатуре для перемещения по представленным предложениям поиска
 */

headerWrapper.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    const highlightedItem = event.currentTarget.querySelector(`.${SUGGESTION_HIGHLIGHTED_CLASS}`);
    const item = event.currentTarget.querySelector(`.${SUGGESTION_CLASS}`);
    if (highlightedItem) {
      highlightedItem.classList.remove(SUGGESTION_HIGHLIGHTED_CLASS);
      highlightedItem.nextElementSibling.classList.add(SUGGESTION_HIGHLIGHTED_CLASS);
      return;
    }
    item.classList.add(SUGGESTION_HIGHLIGHTED_CLASS);
  }
  if (event.key === 'ArrowUp') {
    const highlightedItem = event.currentTarget.querySelector(`.${SUGGESTION_HIGHLIGHTED_CLASS}`);
    const item = event.currentTarget.querySelector(`.${SUGGESTION_CLASS}:last-child`);
    if (highlightedItem) {
      highlightedItem.classList.remove(SUGGESTION_HIGHLIGHTED_CLASS);
      highlightedItem.previousElementSibling.classList.add(SUGGESTION_HIGHLIGHTED_CLASS);
      return;
    }
    item.classList.add(SUGGESTION_HIGHLIGHTED_CLASS);
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    const highlightedItem = event.currentTarget.querySelector(`.${SUGGESTION_HIGHLIGHTED_CLASS}`);
    highlightedItem.click();
  }
});

/**
 * Скрытие предложений после клика на каком-либо варианте
 */

document.addEventListener('click', (event) => {
  if (event.target.classList.contains(SUGGESTION_CLASS[0])) return;
  suggestions.classList.add(SUGGESTIONS_HIDDEN_CLASS);
});

/**
 * Открытие модального окна добавления нового клиента
 */

addClientBtn.addEventListener('click', () => {
  // eslint-disable-next-line no-undef
  const modal = new bootstrap.Modal(document.getElementById(NEW_MODAL_ID));
  cleanContactFields();
  modal.show();
});

/**
 * Добавление поля с контактом в модальном окне
 */

addContactFieldBtn.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    event.target.before(createContactField());
  });
});

/**
 * Добавление маски если тип контакта - телефон
 */

modalWrapper.addEventListener('change', (event) => {
  if (event.target.classList.contains(MODAL_CONTACT_TYPE_SELECT_CLASS)) {
    const wrapper = event.target.closest(`.${CONTACT_WRAPPER_CLASS}`);
    const targetInput = wrapper.querySelector(`.${CONTACT_INPUT_CLASS[0]}`);
    if (event.detail.value === 'phone') {
      // eslint-disable-next-line no-undef
      Inputmask({ mask: '+7(999)-999-99-99' }).mask(targetInput);
      return;
    }
    // eslint-disable-next-line no-undef
    Inputmask.remove(targetInput);
  }
});

/**
 * Добавление/изменение клиента
 */

modalWrapper.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const content = event.target.closest(`.${MODAL_CONTENT_CLASS}`);

  if (!validateForm(form)) return;

  const modal = event.target.closest(`.${MODAL_CLASS}`);
  const modalID = modal.id;
  const formData = new FormData(form);
  let response = null;
  content.classList.add(MODAL_LOADING_CLASS);
  if (modalID === EDIT_MODAL_ID) {
    formData.append('id', form.dataset.id);

    response = await editClient(formData);
  } else {
    response = await addClient(formData);
  }
  if (!response.ok) {
    await errorHandler(response, modalID);
    return;
  }
  const data = await getClients();
  hideModal(modalID);
  content.classList.remove(MODAL_LOADING_CLASS);
  renderTable(tableBody, data);
  form.reset();
});

/**
 * Удаление красной обводки после начала ввода в поле, которое выделилось как ошибка
 */

modalWrapper.addEventListener('input', ({ target: { classList } }) => {
  if (classList.contains(MODAL_NAME_ERROR_CLASS)) {
    classList.remove(MODAL_NAME_ERROR_CLASS);
  }
  if (classList.contains(CONTACT_INPUT_ERROR_CLASS)) {
    classList.remove(CONTACT_INPUT_ERROR_CLASS);
  }
});

/**
 * Подтверждение удаления клиента
 */

modalConfirmDelete.addEventListener('click', async (event) => {
  if (event.target.classList.contains(MODAL_CONFIRM_BTN_CLASS)) {
    const content = event.currentTarget.querySelector(`.${MODAL_CONTENT_CLASS}`);
    content.classList.add(MODAL_LOADING_CLASS);
    const { id } = event.currentTarget;
    const response = await deleteClient(event.target.dataset.id);
    if (!response.ok) {
      await errorHandler(response, id);
      return;
    }
    const data = await getClients();
    content.classList.remove(MODAL_LOADING_CLASS);
    hideModal(id);
    renderTable(tableBody, data);
  }
}, true);

/**
 * Удаление клиента через окно редактирования
 */

editModalDeleteBtn.addEventListener('click', async (event) => {
  const content = event.currentTarget.closest(`.${MODAL_CONTENT_CLASS}`);
  const clientID = event.currentTarget.dataset.id;
  const modalID = event.currentTarget.closest(`.${MODAL_CLASS}`).id;

  content.classList.add(MODAL_LOADING_CLASS);
  const response = await deleteClient(clientID);
  if (!response.ok) {
    await errorHandler(response, modalID);
    return;
  }
  const data = await getClients();
  content.classList.add(MODAL_LOADING_CLASS);
  hideModal(modalID);
  renderTable(tableBody, data);
});

/**
 * Очистка ошибок и формы в модальном окне после скрытия
 */

document.addEventListener('hidden.bs.modal', (event) => {
  const errorList = event.target.querySelector(`.${MODAL_ERRORS_CLASS}`);
  const errorInputs = document.querySelectorAll('[class*="--error"]');
  const form = event.target.querySelector('form');

  form?.reset();
  errorInputs.forEach((input) => {
    const beRemoveClass = Array.from(input.classList)
      .find((className) => className.includes('--error'));
    input.classList.remove(beRemoveClass);
  });
  window.history.replaceState('', '', window.location.pathname);
  while (errorList.firstChild) errorList.firstChild.remove();
});

/**
 * Обработчик клика по выбранному предложению поиска
 */

suggestions.addEventListener('click', (event) => {
  if (event.target.classList.contains('empty')) {
    event.currentTarget.classList.add(SUGGESTIONS_HIDDEN_CLASS);
    return;
  }
  const { id } = event.target.dataset;
  const targetRow = document.getElementById(id);
  searchInput.value = event.target.innerText;
  event.currentTarget.classList.add(SUGGESTIONS_HIDDEN_CLASS);
  targetRow.scrollIntoView({
    block: 'center',
    behavior: 'smooth',
  });
  targetRow.classList.add(HIGHLIGHTED_ROW_CLASS);
  setTimeout(() => {
    targetRow.classList.remove(HIGHLIGHTED_ROW_CLASS);
  }, 5000);
});
