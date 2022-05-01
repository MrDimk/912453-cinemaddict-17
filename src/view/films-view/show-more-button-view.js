import {createElement} from '../../render.js';

const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreButtonView {
  getTemplate() {
    return createShowMoreButtonTemplate();
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

export {ShowMoreButtonView};
