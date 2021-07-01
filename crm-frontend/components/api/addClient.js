import { wait } from '../helpers/wait.js';
import { CLIENTS_URL, WAITING_TIMEOUT } from '../global/constants.js';
import { createFetchBody } from '../helpers/createFetchBody.js';

export async function addClient(data) {
  await wait(WAITING_TIMEOUT);
  return fetch(CLIENTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createFetchBody(data)),
  });
}
