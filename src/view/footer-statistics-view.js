import {createElement} from '../render.js';

const createFooterTemplate = (count) => `
  <p>${count} movies inside</p>
`;

class FooterStatisticsView {
  constructor(count) {
    this.filmsCount = count;
  }

  getTemplate() {
    return createFooterTemplate(this.filmsCount);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export {FooterStatisticsView};
