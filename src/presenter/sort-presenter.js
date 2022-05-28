import SortView from '../view/sort-view';
import {render} from '../framework/render';

export default class SortPresenter {
  #sortView;
  constructor() {
    this.#sortView = new SortView();
  }

  init(container) {
    render(this.#sortView, container);
  }
}

