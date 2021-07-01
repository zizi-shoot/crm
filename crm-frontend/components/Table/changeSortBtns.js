import { ASC_SORT_CLASS, DESC_SORT_CLASS } from '../global/constants.js';

export function changeSortBtns(sortBtns, column) {
  const notTargetBtns = Array.from(sortBtns).filter((btn) => btn !== column);
  notTargetBtns.forEach((btn) => btn.classList.remove(ASC_SORT_CLASS, DESC_SORT_CLASS));
  if (!column.className.includes('-sorted')) {
    column.classList.add(ASC_SORT_CLASS);
    return;
  }
  column.classList.toggle(ASC_SORT_CLASS);
  column.classList.toggle(DESC_SORT_CLASS);
}
