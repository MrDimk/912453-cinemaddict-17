import {View} from '../view';

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

class FilmCardView extends View {
  #data;

  constructor(filmData) {
    super();
    this.#data = filmData;
  }

  getTemplate() {
    return createFilmCardTemplate(this.#data);
  }
}

export {FilmCardView};
