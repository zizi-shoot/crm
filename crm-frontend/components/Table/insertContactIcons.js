import { ICON_CLASS } from '../global/constants.js';

export function insertContactIcons(target, data) {
  data.contacts.forEach((contact, index) => {
    const icons = {
      fb: 'Facebook',
      vk: 'Vkontakte',
      phone: 'Телефон',
      mail: 'E-mail',
      other: 'Другое',
    };
    const classes = ICON_CLASS.join(' ');
    const svgId = `${contact.type}-${data.id}-${index}`;
    const svg = `<svg class="${classes}" id="${svgId}" data-type="${icons[contact.type]}" data-value="${contact.value}">
                  <use xlink:href="./components/global/img/sprite.svg#${contact.type}"></use>
                </svg>`;

    target.insertAdjacentHTML('beforeend', svg);
  });
}
