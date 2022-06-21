import {FilterType} from '../const';
import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = (counters, activeFilter) => {
  const active = {
    all: '',
    watchlist: '',
    history: '',
    favorites: ''
  };

  active[activeFilter] = 'main-navigation__item--active';

  return (`
  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${active.all}" data-type="all">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${active.watchlist}" data-type="watchlist">
      Watchlist <span class="main-navigation__item-count">${counters.whatchlistCount}</span>
    </a>
    <a href="#history" class="main-navigation__item ${active.history}" data-type="history">
      History <span class="main-navigation__item-count">${counters.historyCount}</span>
    </a>
    <a href="#favorites" class="main-navigation__item ${active.favorites}" data-type="favorites">
      Favorites <span class="main-navigation__item-count">${counters.favoritesCount}</span>
    </a>
  </nav>
`);
};

export default class FilterView extends AbstractView {
  #counters;
  #filterChangeHandler;
  #activeFilter = FilterType.ALL;

  constructor(counters, activeFilter) {
    super();
    this.#counters = counters;
    this.#activeFilter = activeFilter;
    this.element.addEventListener('click', (evt) => this.#onFilterChange(evt));
  }

  get template() {
    return createFilterTemplate(this.#counters, this.#activeFilter);
  }

  setFilterChangeHandler(callback) {
    this.#filterChangeHandler = callback;
  }

  #onFilterChange = (evt) => {
    evt.preventDefault();
    if (evt.target.dataset.type && this.#activeFilter !== evt.target.dataset.type) {
      this.#filterChangeHandler(evt.target.dataset.type);
    }
  };
}
