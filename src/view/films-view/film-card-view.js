import AbstractView from '../../framework/view/abstract-view';

const CLASSES = {
  STATE: {
    ACTIVE: 'film-card__controls-item--active'
  },
  FILM_CONTROLS: {
    watchlist: 'film-card__controls-item--add-to-watchlist',
    watched: 'film-card__controls-item--mark-as-watched',
    favorite: 'film-card__controls-item--favorite'
  }
};

const createFilmCardTemplate = (film) => {
  const watchlist = film.watchlist ? CLASSES.STATE.ACTIVE : '';
  const watched = film.watched ? CLASSES.STATE.ACTIVE : '';
  const favorite = film.favorite ? CLASSES.STATE.ACTIVE : '';

  return (`
   <article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${film.title}</h3>
            <p class="film-card__rating">${film.rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${film.releaseYear}</span>
              <span class="film-card__duration">${film.duration}</span>
              <span class="film-card__genre">${film.genre}</span>
            </p>
            <img src="${film.poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${film.shortDescription}</p>
            <span class="film-card__comments">${film.comments}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watched}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favorite}" type="button">Mark as favorite</button>
          </div>
        </article>
`);
};

export default class FilmCardView extends AbstractView {
  #data;
  #callback = {};
  #buttons = {};

  constructor(filmData) {
    super();
    this.#data = filmData;
    Object.keys(CLASSES.FILM_CONTROLS).forEach((control) => {
      this.#buttons[control] = this.element.querySelector(`.${CLASSES.FILM_CONTROLS[control]}`);
    });
  }

  get template() {
    return createFilmCardTemplate(this.#data);
  }

  get buttons() {
    return this.#buttons;
  }

  // Назначение внешних обработчиков событий
  setControlChangeHandler(callback) {
    this.#callback.controlChange = callback;
    Object.keys(CLASSES.FILM_CONTROLS).forEach((control) => {
      this.#buttons[control].addEventListener('click', (evt) => this.#onControlButtonClick(evt, control));
    });
  }

  // Выполнение сторонних обработчиков событий
  #onControlButtonClick = (evt, control) => {
    evt.preventDefault();
    this.#callback.controlChange(control);
  };

  // Методы изменения отображения компонента
  switchState(element, switchOn) {
    super.switchState(element, switchOn, CLASSES.STATE.ACTIVE);
  }
}

