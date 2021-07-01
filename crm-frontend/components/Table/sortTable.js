import { DESC_SORT_CLASS } from '../global/constants.js';

export function sortTable(table, column) {
  const headRow = column.closest('tr');
  const columnIndex = Array.from(headRow.children).indexOf(column);
  const bodyRows = Array.from(table.rows);

  bodyRows.sort((rowA, rowB) => {
    if (rowA.cells[columnIndex].innerText === rowB.cells[columnIndex].innerText) return 0;
    return rowA.cells[columnIndex].innerText > rowB.cells[columnIndex].innerText ? 1 : -1;
  });

  if (column.classList.contains(DESC_SORT_CLASS)) bodyRows.reverse();
  table.append(...bodyRows);
}
