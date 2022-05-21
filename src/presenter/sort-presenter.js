import {SortView} from '../view/sort-view';
import {render} from '../framework/render';

class SortPresenter {
  #sortView;
  constructor() {
    this.#sortView = new SortView();
  }

  init(container) {
    render(this.#sortView, container);
  }
}

export {SortPresenter};
