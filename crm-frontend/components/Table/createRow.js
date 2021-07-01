import { ACTION_LOADING_CLASS, ACTIONS_CLASS, CONTACTS_CLASS, CONTACTS_EXPAND_BTN_CLASS, CONTACTS_EXPANDED_CLASS, COPY_CLASS, CREATE_AT_CLASS, DEL_CLASS, DELETE_CONFIRM_MODAL_ID, EDIT_CLASS, ID_CLASS, MODAL_CONFIRM_BTN_CLASS, NAME_CLASS, ROW_CLASS, TIME_CLASS, UPDATE_AT_CLASS } from '../global/constants.js';
import { cleanContactFields } from './cleanContactFields.js';
import { showEditModal } from '../Modals/showEditModal.js';
import { insertContactIcons } from './insertContactIcons.js';

export function createRow(rowData) {
  // Создание HTML-элементов таблицы
  const createDate = new Date(rowData.createdAt);
  const updateDate = new Date(rowData.updatedAt);
  const row = document.createElement('tr');
  const id = document.createElement('td');
  const fullName = document.createElement('td');
  const createdAt = document.createElement('td');
  const updatedAt = document.createElement('td');
  const contacts = document.createElement('td');
  const actions = document.createElement('td');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const expandContactsBtn = document.createElement('button');
  const copyBtn = document.createElement('button');

  // Назначение классов элементам
  row.classList.add(...ROW_CLASS);
  id.classList.add(...ID_CLASS);
  fullName.classList.add(...NAME_CLASS);
  createdAt.classList.add(...CREATE_AT_CLASS);
  updatedAt.classList.add(...UPDATE_AT_CLASS);
  contacts.classList.add(...CONTACTS_CLASS);
  actions.classList.add(...ACTIONS_CLASS);
  editBtn.classList.add(...EDIT_CLASS);
  deleteBtn.classList.add(...DEL_CLASS);
  copyBtn.classList.add(...COPY_CLASS);
  expandContactsBtn.classList.add(...CONTACTS_EXPAND_BTN_CLASS);

  // Дата-атрибуты с ID клиента для последующей передачи в запросы редактирования/удаления
  editBtn.dataset.id = rowData.id;
  deleteBtn.dataset.id = rowData.id;
  copyBtn.dataset.id = rowData.id;
  row.id = rowData.id;

  // Вставка текста/HTML-кода в элементы
  id.innerText = rowData.id;
  fullName.innerText = `${rowData.surname} ${rowData.name} ${rowData.lastName}`;
  createdAt.innerHTML = `${createDate.toLocaleDateString()} <span class="${TIME_CLASS.join(' ')}">${createDate.toLocaleTimeString([], { timeStyle: 'short' })}</span>`;
  updatedAt.innerHTML = `${updateDate.toLocaleDateString()} <span class="${TIME_CLASS.join(' ')}">${updateDate.toLocaleTimeString([], { timeStyle: 'short' })}</span>`;
  editBtn.innerText = 'Изменить';
  deleteBtn.innerText = 'Удалить';
  copyBtn.innerText = 'Копировать';
  expandContactsBtn.innerText = `+${rowData.contacts.length - 4}`;

  // eslint-disable-next-line no-undef
  tippy(copyBtn, {
    content: 'Ссылка скопирована в буфер обмена',
    trigger: 'click',
  });

  // Обработчики для действий
  editBtn.addEventListener('click', (event) => {
    cleanContactFields();
    event.currentTarget.classList.add(ACTION_LOADING_CLASS);
    showEditModal(rowData.id, event.currentTarget);
  });

  deleteBtn.addEventListener('click', async () => {
    const modal = document.getElementById(DELETE_CONFIRM_MODAL_ID);
    modal.querySelector(`.${MODAL_CONFIRM_BTN_CLASS}`).dataset.id = rowData.id;
    // eslint-disable-next-line no-undef
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(`${window.location.href}#${rowData.id}`);
  });

  contacts.addEventListener('click', (event) => {
    if (event.target.classList.contains(CONTACTS_EXPAND_BTN_CLASS[0])) {
      event.currentTarget.classList.remove(CONTACTS_EXPANDED_CLASS);
    }
  });

  // Отрисовка иконок контактов
  insertContactIcons(contacts, rowData);

  actions.append(editBtn, copyBtn, deleteBtn);
  if (rowData.contacts.length > 5) {
    contacts.classList.add(CONTACTS_EXPANDED_CLASS);
    contacts.append(expandContactsBtn);
  }
  row.append(id, fullName, createdAt, updatedAt, contacts, actions);
  return row;
}
