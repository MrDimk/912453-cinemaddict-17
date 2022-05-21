import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = (counters) => `
<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span
          class="main-navigation__item-count">${counters.whatchlistCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${counters.historyCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span
          class="main-navigation__item-count">${counters.favoritesCount}</span></a>
    </nav>
`;

class FilterView extends AbstractView {
  #counters;
  constructor(counters) {
    super();
    this.#counters = counters;
  }

  get template() {
    return createFilterTemplate(this.#counters);
  }
}

export {FilterView};
