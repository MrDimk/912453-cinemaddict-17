import AbstractView from '../framework/view/abstract-view';

const CLASSES = {
  STATE: {
    ACTIVE: 'sort__button--active'
  },
  SORT_BUTTON: 'sort__button'
};

const createSortTemplate = (sortTypes, activeType) => {
  const sortButtons = [];
  sortTypes.forEach((type) => sortButtons.push(`<li>
  <a href="#" class="${CLASSES.SORT_BUTTON} ${type === activeType ? CLASSES.STATE.ACTIVE : ''}">Sort by ${type}</a>
  </li>`));

  return (`
    <ul class="sort">
      ${sortButtons.join('')}
    </ul>
  `);
};

export default class SortView extends AbstractView {
  #sortingChangeHandler;
  #buttons;
  #sortTypes;
  #activeTypeIndex;

  constructor(sortTypesArray, activeTypeIndex = 0) {
    super();
    this.#sortTypes = sortTypesArray;
    this.#activeTypeIndex = activeTypeIndex;
    this.#buttons = this.element.querySelectorAll(`.${CLASSES.SORT_BUTTON}`);
  }

  get template() {
    return createSortTemplate(this.#sortTypes, this.#sortTypes[this.#activeTypeIndex]);
  }

  setSortingChangeHandler(callback) {
    this.#sortingChangeHandler = callback;
    this.#buttons.forEach((button, index) => button
      .addEventListener('click', (evt) => this.#onSortButtonClick(evt, index)));
  }

  #onSortButtonClick = (evt, sortTypeIndex) => {
    evt.preventDefault();
    if (this.#activeTypeIndex !== sortTypeIndex) {
      this.switchState(this.#buttons[this.#activeTypeIndex], false);
      this.#activeTypeIndex = sortTypeIndex;
      this.switchState(this.#buttons[this.#activeTypeIndex], true);
      this.#sortingChangeHandler(this.#sortTypes[this.#activeTypeIndex]);
    }
  };

  switchState(element, switchOn) {
    super.switchState(element, switchOn, CLASSES.STATE.ACTIVE);
  }
}
