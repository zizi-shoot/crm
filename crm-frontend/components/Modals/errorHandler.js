import { MODAL_ERRORS_CLASS, MODAL_ERRORS_HIDDEN_CLASS } from '../global/constants.js';

export async function errorHandler(response, id) {
  const errorList = document.querySelector(`#${id} .${MODAL_ERRORS_CLASS}`);

  while (errorList.firstChild) errorList.firstChild.remove();
  errorList.classList.remove(MODAL_ERRORS_HIDDEN_CLASS);

  const json = await response.json();
  const error = document.createElement('li');

  // Если пришло одно сообщение с ошибкой
  if (json.message) {
    error.innerText = json.message;
    errorList.append(error);
    return;
  }

  // Если пришёл массив ошибок
  if (json.errors) {
    json.errors.forEach((item) => {
      const errorItem = document.createElement('li');

      errorItem.innerText = item.message;
      errorList.append(errorItem);
    });
    return;
  }

  // Если не удалось распарсить ответ
  error.innerText = 'Что-то пошло не так...';
  errorList.append(error);
}
