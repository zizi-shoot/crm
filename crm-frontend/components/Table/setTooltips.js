import { ICON_CLASS } from '../global/constants.js';

export function setTooltips() {
  const icons = document.querySelectorAll(`.${ICON_CLASS[0]}`);
  icons.forEach((icon) => {
    const { type, value } = icon.dataset;
    const content = `<span>${type}: ${value}</span>`;

    // eslint-disable-next-line no-undef
    tippy(`#${icon.id}`, {
      allowHTML: true,
      content,
    });
  });
}
