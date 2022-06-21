import {FilterType} from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  #currentFilter = FilterType.ALL;

  get filter() {
    return this.#currentFilter;
  }

  setFilter = (updateType, filter) => {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  };
}
