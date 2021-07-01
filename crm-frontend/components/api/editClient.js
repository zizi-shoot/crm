import { wait } from '../helpers/wait.js';
import { CLIENTS_URL, WAITING_TIMEOUT } from '../global/constants.js';
import { createFetchBody } from '../helpers/createFetchBody.js';

export async function editClient(data) {
  await wait(WAITING_TIMEOUT);
  const id = data.get('id');
  return fetch(`${CLIENTS_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createFetchBody(data)),
  });
}
