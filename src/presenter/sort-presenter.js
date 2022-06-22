import SortView from '../view/sort-view';
import {render, RenderPosition} from '../framework/render';
import dayjs from 'dayjs';

const SORT = {
  TYPES: ['default', 'date', 'rating'], // Только эти типы используются в генерации элементов интерфейса сортировки
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
    'comments': (a, b) => {
      const commentsA = Number(a.comments.length);
      const commentsB = Number(b.comments.length);
      return commentsA > commentsB ? -1 : 1;
    }
  }))
};

export default class SortPresenter {
  #sortView;
  #sortedList;
  #listeners;

  static #comparators = SORT.COMPARATORS;

  constructor(getFilms) {
    this.getFilms = getFilms;
    this.#listeners = new Set();
    this.#sortView = new SortView(SORT.TYPES);
    this.#sortView.setSortingChangeHandler(this.sortFilms);
  }

  addSortUpdateListener(callback) {
    this.#listeners.add(callback);
  }

  sortFilms = (type) => {
    this.#sortedList = SortPresenter.sortBy(this.getFilms(), type);
    this.#listeners.forEach((listener) => listener(this.#sortedList));
  };

  setSort = (type, runAnyway = false) => this.#sortView.setSort(type, runAnyway);

  init(container) {
    render(this.#sortView, container, RenderPosition.AFTERBEGIN);
  }

  // Используем для создания дополнительных предсортированных списков
  static addComparator(typeName, compareFunction) {
    SortPresenter.#comparators.set(typeName, compareFunction);
  }

  static sortBy = (films, type) => {
    if (type === 'default' || !SortPresenter.#comparators.has(type)) {
      return films;
    } else {
      return films.slice().sort(SortPresenter.#comparators.get(type));
    }
  };
}
