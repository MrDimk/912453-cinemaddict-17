import {createElement} from '../../render.js';

const createFilmListTemplate = (type) => `
    <section class="films-list ${type ? type : ''}">
    </section>
`;

class FilmsListView {
  constructor(type = '') {
    this.type = type;
  }

  getTemplate() {
    return createFilmListTemplate(this.type);
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

export {FilmsListView};
