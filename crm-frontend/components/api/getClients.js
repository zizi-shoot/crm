import { wait } from '../helpers/wait.js';
import { CLIENTS_URL, WAITING_TIMEOUT } from '../global/constants.js';

export async function getClients(searchString = '') {
  await wait(WAITING_TIMEOUT);
  const params = searchString ? `?search=${searchString}` : '';
  const response = await fetch(CLIENTS_URL + params);
  return response.json();
}
