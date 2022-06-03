import {render} from '../framework/render';
import FooterStatisticsView from '../view/footer-statistics-view';

export default class FooterPresenter {
  #counter;
  #footerStatisticsView;

  constructor(data) {
    this.#counter = data.films.length;
    this.#footerStatisticsView = new FooterStatisticsView(this.#counter);
  }

  init(container) {
    render(this.#footerStatisticsView, container);
  }
}

