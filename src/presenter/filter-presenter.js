import FilterView from '../view/filter-view';
import {render, RenderPosition} from '../framework/render';

export default class FilterPresenter {
  #data;
  #filterView;
  #counters = {};

  constructor(data) {
    this.#counters.whatchlistCount = 0;
    this.#counters.historyCount = 0;
    this.#counters.favoritesCount = 0;
    this.#data = data;
    this.#data.films.forEach((film) => {
      const details = film['user_details'];
      this.#counters.whatchlistCount += details.watchlist ? 1 : 0;
      this.#counters.historyCount += details['already_watched'] ? 1 : 0;
      this.#counters.favoritesCount += details.favorite ? 1 : 0;
    });
    this.#filterView = new FilterView(this.#counters);
  }

  init(container) {
    render(this.#filterView, container, RenderPosition.AFTERBEGIN);
  }
}

