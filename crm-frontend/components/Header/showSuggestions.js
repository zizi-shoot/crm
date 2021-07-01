import { SUGGESTIONS_CLASS, SUGGESTIONS_HIDDEN_CLASS } from '../global/constants.js';
import { createSuggestions } from './createSuggestions.js';

export const suggestions = document.querySelector(`.${SUGGESTIONS_CLASS}`);

export function showSuggestions(data) {
  while (suggestions.firstChild) suggestions.firstChild.remove();
  suggestions.classList.remove(SUGGESTIONS_HIDDEN_CLASS);
  suggestions.append(...createSuggestions(data));
}
