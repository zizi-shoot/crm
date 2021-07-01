import { createRow } from './createRow.js';
import { setTooltips } from './setTooltips.js';

export function renderTable(table, data) {
  while (table.firstChild) table.firstChild.remove();
  data.forEach((item) => table.append(createRow(item)));
  setTooltips();
}
