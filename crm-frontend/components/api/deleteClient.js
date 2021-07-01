import { wait } from '../helpers/wait.js';
import { CLIENTS_URL, WAITING_TIMEOUT } from '../global/constants.js';

export async function deleteClient(id) {
  await wait(WAITING_TIMEOUT);
  return fetch(`${CLIENTS_URL}/${id}`, { method: 'DELETE' });
}
