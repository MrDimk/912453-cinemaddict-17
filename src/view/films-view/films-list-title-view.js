import AbstractView from '../../framework/view/abstract-view';

const createFilmsTitleTemplate = (title, isHidden) => `<h2 class="films-list__title${isHidden ? ' visually-hidden' : ''}">${title}</h2>`;

export default class FilmsTitleView extends AbstractView {
  constructor(title, isHidden = false) {
    super();
    this.title = title;
    this.isHidden = isHidden;
  }

  get template() {
    return createFilmsTitleTemplate(this.title, this.isHidden);
  }
}
