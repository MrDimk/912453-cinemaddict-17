import AbstractView from '../../framework/view/abstract-view';

const createFilmsTitleTemplate = (title, isHidden) => `<h2 class="films-list__title${isHidden ? ' visually-hidden' : ''}">${title}</h2>`;

export default class FilmsTitleView extends AbstractView {
  #title;
  #isHidden;

  constructor(title, isHidden = false) {
    super();
    this.#title = title;
    this.#isHidden = isHidden;
  }

  set title(title) {
    this.#title = title;
  }

  set isHidden(isHidden) {
    this.#isHidden = isHidden;
  }

  get isHidden() {
    return this.#isHidden;
  }

  get title() {
    return this.#title;
  }

  get template() {
    return createFilmsTitleTemplate(this.title, this.isHidden);
  }
}
