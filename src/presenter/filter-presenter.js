import {FilterView} from '../view/filter-view';
import {render} from '../framework/render';

class FilterPresenter {
  #data;
  #filterView;
  #counters = {};

  constructor(data) {
    this.#counters.whatchlistCount = 0;
    this.#counters.historyCount = 0;
    this.#counters.favoritesCount = 0;
    this.#data = data;
    // console.log(this.#data.films[0]['user_details']);
    this.#data.films.forEach((film) => {
      const details = film['user_details'];
      // console.log(details.watchlist);
      this.#counters.whatchlistCount += details.watchlist ? 1 : 0;
      this.#counters.historyCount += details['already_watched'] ? 1 : 0;
      this.#counters.favoritesCount += details.favorite ? 1 : 0;
    });

    // console.log(this.#counters);
    this.#filterView = new FilterView(this.#counters);

  }

  init(container) {
    render(this.#filterView, container);
  }
}

export {FilterPresenter};
