import dayjs from 'dayjs';
import AbstractView from '../../framework/view/abstract-view';

const CLASSES = {
  STATE: {
    ACTIVE: 'film-details__control-button--active'
  },
  FILM_CONTROLS: {
    watchlist: 'film-details__control-button--watchlist',
    watched: 'film-details__control-button--watched',
    favorite: 'film-details__control-button--favorite'
  },
  CLOSE_BUTTON: 'film-details__close'
};

const createFilmDetailsTemplate = (film, comments) => {
  const watchlist = film.watchlist ? CLASSES.STATE.ACTIVE : '';
  const watched = film.watched ? CLASSES.STATE.ACTIVE : '';
  const favorite = film.favorite ? CLASSES.STATE.ACTIVE : '';

  const genres = [];
  film.genres.forEach((genre) => genres.push(`<span class="film-details__genre">${genre}</span>`));

  const commentsLayoutArray = [];
  comments.forEach((comment) => {
    const commentDay = dayjs(comment.date).format('YYYY/MM/DD HH:MM');
    commentsLayoutArray.push(`
    <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${commentDay}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
    `);
  });

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${film.poster}" alt="">

              <p class="film-details__age">${film.age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.title}</h3>
                  <p class="film-details__title-original">Original: ${film.title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${film.writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${film.releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${film.duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genres.join('')}
                    </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${film.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${watched}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsLayoutArray.join('')}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  `);
};

export default class FilmDetailsView extends AbstractView {
  static #currentDetailsPopup = null;

  #film;
  #comments;
  #callback = {};
  #buttons = {};

  static set currentDetailsPopup(instanse) {
    this.#currentDetailsPopup = instanse;
  }

  static get currentDetailsPopup() {
    return FilmDetailsView.#currentDetailsPopup;
  }

  static clearCurrentDetailsPopup() {
    this.#currentDetailsPopup = null;
  }

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
    Object.keys(CLASSES.FILM_CONTROLS).forEach((control) => {
      this.#buttons[control] = this.element.querySelector(`.${CLASSES.FILM_CONTROLS[control]}`);
    });
    this.#buttons.close = this.element.querySelector(`.${CLASSES.CLOSE_BUTTON}`);
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
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

  setCloseButtonClickHandler(callback) {
    this.#callback.closeButtonClick = callback;
    this.#buttons.close.addEventListener('click', (evt) => this.#onCloseButtonClick(evt));
  }

  // Выполнение сторонних обработчиков событий
  #onCloseButtonClick = (evt) => {
    evt.preventDefault();
    this.#callback.closeButtonClick();
  };

  #onControlButtonClick = (evt, control) => {
    evt.preventDefault();
    this.#callback.controlChange(control);
  };

  // Методы изменения отображения компонента
  switchState(element, switchOn) {
    super.switchState(element, switchOn, CLASSES.STATE.ACTIVE);
  }
}
