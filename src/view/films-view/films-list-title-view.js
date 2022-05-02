import {View} from '../view';

const createFilmsTitleTemplate = (title, isHidden) => `<h2 class="films-list__title${isHidden ? ' visually-hidden' : ''}">${title}</h2>`;

class FilmsTitleView extends View{
  constructor(title, isHidden = false) {
    super();
    this.title = title;
    this.isHidden = isHidden;
  }

  getTemplate() {
    return createFilmsTitleTemplate(this.title, this.isHidden);
  }
}

export {FilmsTitleView};
