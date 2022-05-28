import AbstractView from '../../framework/view/abstract-view';

const createFilmCardTemplate = (film) => {

  const watchlist = film.watchlist ? 'film-card__controls-item--active' : '';
  const watched = film.watched ? 'film-card__controls-item--active' : '';
  const favorite = film.favorite ? 'film-card__controls-item--active' : '';

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
    this.#buttons = {
      close: this.element.querySelector('.film-details__close'),
      watchlist: this.element.querySelector('.film-card__controls-item--add-to-watchlist'),
      watched: this.element.querySelector('.film-card__controls-item--mark-as-watched'),
      favorite: this.element.querySelector('.film-card__controls-item--favorite')
    };
  }

  get template() {
    return createFilmCardTemplate(this.#data);
  }

  // Назначение внешних обработчиков событий
  setWatchlistChangeHandler(callback) {
    this.#callback.watchlistChange = callback;
    this.#buttons.watchlist.addEventListener('click', (evt) => this.#onWatchlistClick(evt));
  }

  setWatchedChangeHandler(callback) {
    this.#callback.watchedChange = callback;
    this.#buttons.watched.addEventListener('click', (evt) => this.#onWatchedClick(evt));
  }

  setFavoriteChangeHandler(callback) {
    this.#callback.favoriteChange = callback;
    this.#buttons.favorite.addEventListener('click', (evt) => this.#onFavoriteClick(evt));
  }

  // Выполнение сторонних обработчиков событий
  #onWatchlistClick = (evt) => {
    evt.preventDefault();
    this.#callback.watchlistChange();
  };

  #onWatchedClick = (evt) => {
    evt.preventDefault();
    this.#callback.watchedChange();
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#callback.favoriteChange();
  };

  // Методы изменения отображения компонента
  watchlistButtonOn() {
    this.#buttons.watchlist.classList.add('film-card__controls-item--active');
  }

  watchedButtonOn() {
    this.#buttons.watched.classList.add('film-card__controls-item--active');
  }

  favoriteButtonOn() {
    this.#buttons.favorite.classList.add('film-card__controls-item--active');
  }

  watchlistButtonOff() {
    this.#buttons.watchlist.classList.remove('film-card__controls-item--active');
  }

  watchedButtonOff() {
    this.#buttons.watched.classList.remove('film-card__controls-item--active');
  }

  favoriteButtonOff() {
    this.#buttons.favorite.classList.remove('film-card__controls-item--active');
  }
}

