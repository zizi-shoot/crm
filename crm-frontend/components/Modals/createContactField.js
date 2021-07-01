import { CONTACT_DEL_CLASS, CONTACT_INPUT_CLASS, CONTACT_WRAPPER_CLASS } from '../global/constants.js';

export function createContactField(contact = null) {
  // Создание HTML-элементов таблицы
  const wrapper = document.createElement('div');
  const select = document.createElement('select');
  const id = new Date().getTime();
  const optionPhone = document.createElement('option');
  const optionMail = document.createElement('option');
  const optionVk = document.createElement('option');
  const optionFb = document.createElement('option');
  const optionOther = document.createElement('option');
  const input = document.createElement('input');
  const deleteBtn = document.createElement('button');

  const options = [optionPhone, optionMail, optionVk, optionFb, optionOther];

  input.type = 'text';

  // Назначение классов элементам
  wrapper.classList.add(...CONTACT_WRAPPER_CLASS);
  input.classList.add(...CONTACT_INPUT_CLASS);
  deleteBtn.classList.add(...CONTACT_DEL_CLASS);

  // ID каждому селекту для имплементации кастомного скролла
  select.id = `choice-${id}`;

  select.name = 'contact-type';
  input.name = 'contact-value';

  // Значения для options
  optionPhone.value = 'phone';
  optionMail.value = 'mail';
  optionVk.value = 'vk';
  optionFb.value = 'fb';
  optionOther.value = 'other';

  // Вставка в инпут данных клиента при редактировании
  input.value = contact?.value ? contact.value : null;

  // Установка выбранного значения для селекта с типом контакта
  const selectedOption = options.find((option) => option.value === contact?.type);
  if (selectedOption) selectedOption.selected = true;

  // Маска для телефона
  if (!selectedOption || selectedOption.value === 'phone') {
    // eslint-disable-next-line no-undef
    Inputmask({ mask: '+7(999)-999-99-99' }).mask(input);
  }

  optionPhone.innerText = 'Телефон';
  optionMail.innerText = 'Email';
  optionVk.innerText = 'Vkontakte';
  optionFb.innerText = 'Facebook';
  optionOther.innerText = 'Другое';

  deleteBtn.innerHTML = `<svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                           <g opacity="0.7">
                            <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"/>
                           </g>
                         </svg>`;

  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();
    wrapper.remove();
  });

  select.append(...options);
  wrapper.append(select, input, deleteBtn);

  // Кастомный селект
  // eslint-disable-next-line no-new,no-undef
  new Choices(select, {
    searchEnabled: false,
    itemSelectText: '',
    classNames: {
      containerInner: 'modal-contact__inner choices__inner',
      containerOuter: 'modal-contact__outer choices',
      item: 'choices__item modal-contact__item',
    },
  });

  return wrapper;
}
