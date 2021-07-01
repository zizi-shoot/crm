import { SUGGESTION_CLASS } from '../global/constants.js';

export function createSuggestions(data) {
  const container = [];
  if (!data.length) {
    const li = document.createElement('li');
    li.classList.add(...SUGGESTION_CLASS);
    li.innerText = 'Ничего не найдено';
    li.classList.add('empty');
    container.push(li);
    return container;
  }
  data.forEach(({ name, surname, lastName, id }) => {
    const li = document.createElement('li');
    li.classList.add(...SUGGESTION_CLASS);
    li.innerText = `${surname} ${name} ${lastName}`;
    li.dataset.id = id;
    container.push(li);
  });

  return container;
}
