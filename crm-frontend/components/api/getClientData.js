import { wait } from '../helpers/wait.js';
import { CLIENTS_URL, WAITING_TIMEOUT } from '../global/constants.js';

export async function getClientData(id) {
  await wait(WAITING_TIMEOUT);
  const response = await fetch(`${CLIENTS_URL}/${id}`);
  return response.json();
}
