import {createElement} from '../../render.js';

const createFilmsTitleTemplate = (title, isHidden) => `<h2 class="films-list__title${isHidden ? ' visually-hidden' : ''}">${title}</h2>`;

class FilmsTitleView {
  constructor(title, isHidden = false) {
    this.title = title;
    this.isHidden = isHidden;
  }

  getTemplate() {
    return createFilmsTitleTemplate(this.title, this.isHidden);
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

export {FilmsTitleView};
