import FilterView from '../view/filter-view';
import {render, RenderPosition, replace} from '../framework/render';
import {UpdateType} from '../const';

export default class FilterPresenter {
  #container;
  #dataModel;
  #filterModel;
  #filterView;
  #counters = {};

  constructor(container, dataModel, filterModel) {
    this.#container = container;
    this.#dataModel = dataModel;
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#onFilterModelEvent);
    this.#dataModel.addObserver(this.#onFilterModelEvent);
  }

  init() {
    const prevFilterView = this.#filterView || null;

    this.#updateCounters();
    this.#filterView = new FilterView(this.#counters, this.#filterModel.filter);
    this.#filterView.setFilterChangeHandler(this.#onUserAction);

    if (prevFilterView) {
      replace(this.#filterView, prevFilterView);
    } else {
      render(this.#filterView, this.#container, RenderPosition.AFTERBEGIN);
    }
  }

  #updateCounters() {
    this.#counters = {
      whatchlistCount: 0,
      historyCount: 0,
      favoritesCount: 0
    };
    this.#dataModel.films.forEach((film) => {
      const details = film['user_details'];
      this.#counters.whatchlistCount += details.watchlist ? 1 : 0;
      this.#counters.historyCount += details['already_watched'] ? 1 : 0;
      this.#counters.favoritesCount += details.favorite ? 1 : 0;
    });
  }

  #onUserAction = (filter) => {
    this.#filterModel.setFilter(UpdateType.MOJOR, filter);
  };

  #onFilterModelEvent = () => this.init();
}
