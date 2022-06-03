import AbstractView from '../framework/view/abstract-view';

const createFooterTemplate = (count) => `
  <p>${count} movies inside</p>
`;

export default class FooterStatisticsView extends AbstractView {
  #filmsCount;

  constructor(counter) {
    super();
    this.#filmsCount = counter;
  }

  get template() {
    return createFooterTemplate(this.#filmsCount);
  }
}
