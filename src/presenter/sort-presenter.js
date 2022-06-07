import SortView from '../view/sort-view';
import {render, RenderPosition} from '../framework/render';
import dayjs from 'dayjs';

const SORT = {
  TYPES: ['dafault', 'date', 'rating'],
  COMPARATORS: new Map(Object.entries({
    'date': (a, b) => {
      const dateA = dayjs(a.film_info.release.date);
      const dateB = dayjs(b.film_info.release.date);
      return dateA.isAfter(dateB, 'day') ? -1 : 1;
    },
    'rating': (a, b) => {
      const ratingA = Number(a.film_info.total_rating);
      const ratingB = Number(b.film_info.total_rating);
      return ratingA > ratingB ? -1 : 1;
    },
  }))
};

export default class SortPresenter {
  #sortView;
  #originList;
  #sortedList;
  #comparators;
  #listeners;

  constructor(filmsList) {
    this.#originList = filmsList;
    this.#comparators = SORT.COMPARATORS;
    this.#listeners = new Set();
    this.#sortView = new SortView(SORT.TYPES);
    this.#sortView.setSortingChangeHandler(this.sortBy);
  }

  // Пока данный метод не используется, компараторы присваиваются сразу в конструкторе
  addComparator(name, compareFunction) {
    this.#comparators.set(name, compareFunction);
  }

  addSortUpdateListener(callback) {
    this.#listeners.add(callback);
  }

  sortBy = (type) => {
    if (type === 'default' || !this.#comparators.has(type)) {
      this.#sortedList = this.#originList;
    } else {
      this.#sortedList = this.#originList.slice().sort(this.#comparators.get(type));
    }
    this.#listeners.forEach((listener) => listener(this.#sortedList));
    return this.#sortedList;
  };

  init(container) {
    render(this.#sortView, container, RenderPosition.AFTERBEGIN);
  }
}

