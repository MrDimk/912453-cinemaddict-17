import dayjs from 'dayjs';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {render} from '../../framework/render';
import FilmDataAdapter from '../../presenter/film-data-adapter';
import KeyHandler from '../../util';
import he from 'he';

const CLASSES = {
  STATE: {
    ACTIVE: 'film-details__control-button--active'
  },
  FILM_CONTROLS: {
    watchlist: 'film-details__control-button--watchlist',
    'already_watched': 'film-details__control-button--watched',
    favorite: 'film-details__control-button--favorite'
  },
  CLOSE_BUTTON: 'film-details__close'
};

const EMOJIES = {
  smile: './images/emoji/smile.png',
  sleeping: './images/emoji/sleeping.png',
  puke: './images/emoji/puke.png',
  angry: './images/emoji/angry.png'
};

const createFilmDetailsTemplate = (state) => {
  const watchlist = state['user_details'].watchlist ? CLASSES.STATE.ACTIVE : '';
  const watched = state['user_details']['already_watched'] ? CLASSES.STATE.ACTIVE : '';
  const favorite = state['user_details'].favorite ? CLASSES.STATE.ACTIVE : '';

  const genres = [];
  state.genres.forEach((genre) => genres.push(`<span class="film-details__genre">${genre}</span>`));

  const commentsLayoutArray = [];
  state.comments.forEach((comment) => {
    const commentDay = dayjs(comment.date).format('YYYY/MM/DD HH:MM');
    commentsLayoutArray.push(`
    <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${commentDay}</span>
        <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
      </p>
    </div>
  </li>
    `);
  });

  const emojiesLayoutArray = [];
  Object.keys(EMOJIES).forEach((key) => emojiesLayoutArray.push(`
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${key}" value="${key}" ${state.newComment.emoji === key ? 'checked' : ''}>
    <label class="film-details__emoji-label" for="emoji-${key}">
      <img src="${EMOJIES[key]}" width="30" height="30" alt="emoji">
    </label>
  `));

  let emojiImage = '';
  if (EMOJIES[state.newComment.emoji]) {
    emojiImage = `<img src="${EMOJIES[state.newComment.emoji]}" width="55" height="55" alt="emoji-${state.newComment.emoji}">`;
  }
  const newComment = {
    img: emojiImage,
    text: state.newComment.text
  };

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${state.poster}" alt="">

              <p class="film-details__age">${state.age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${state.title}</h3>
                  <p class="film-details__title-original">Original: ${state.title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${state.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${state.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${state.writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${state.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${state.releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${state.duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${state.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genres.join('')}
                    </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${state.description}
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
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${state.comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsLayoutArray.join('')}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">${newComment.img}</div>
              <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment.text}</textarea>
              </label>

              <div class="film-details__emoji-list">
              ${emojiesLayoutArray.join('')}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  `);
};

export default class FilmDetailsView extends AbstractStatefulView {
  static #currentDetailsPopup = null;

  #film;
  #callback = {};
  #buttons = {};
  #form;
  #container;
  #newCommentText = '';
  #newCommentEmoji = null;
  #currentScrollTop = 0;

  static set currentDetailsPopup(instanse) {
    this.#currentDetailsPopup = instanse;
  }

  static get currentDetailsPopup() {
    return FilmDetailsView.#currentDetailsPopup;
  }

  static clearCurrentDetailsPopup() {
    this.#currentDetailsPopup = null;
  }

  static dataToState = (film, comments, currentEmoji = null, currentCommentText = '') => ({
    ...FilmDataAdapter.forDetails(film),
    comments: comments,
    newComment: {
      emoji: currentEmoji,
      text: currentCommentText
    }
  });

  constructor(film, loadComments, container) {
    super();
    this.#film = film;
    this.loadComments = loadComments;
    this.#container = container;
  }

  init = (film) => {
    this._state = FilmDetailsView.dataToState(film, this.filmComments, this.#newCommentEmoji, this.#newCommentText);
    this.render();
  };

  get filmComments() {
    const filmComments = this.loadComments().filter((comment) => this.#film.comments.some((id) => comment.id === id));
    return filmComments;
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  get buttons() {
    return this.#buttons;
  }

  get newCommentText() {
    return this.#newCommentText;
  }

  set newCommentText(text) {
    this.#newCommentText = text;
  }

  get newCommentEmoji() {
    return this.#newCommentEmoji;
  }

  set newCommentEmoji(emoji) {
    this.#newCommentEmoji = emoji;
  }

  getCurrentScroll = () => this.#currentScrollTop;

  _restoreHandlers = () => {
    Object.keys(CLASSES.FILM_CONTROLS).forEach((control) => {
      this.#buttons[control] = this.element.querySelector(`.${CLASSES.FILM_CONTROLS[control]}`);
      this.#buttons[control].addEventListener('click', (evt) => this.#onControlButtonClick(evt, control));
    });

    this.#buttons.close = this.element.querySelector(`.${CLASSES.CLOSE_BUTTON}`);
    this.#buttons.close.addEventListener('click', (evt) => this.#onCloseButtonClick(evt));

    this.#buttons.commentDelete = this.element.querySelectorAll('.film-details__comment-delete');

    this.#form = this.element.querySelector('.film-details__inner');
    this.#form.addEventListener('change', (evt) => this.#onCommentEmojiChange(evt));
    this.#form.addEventListener('input', (evt) => this.#onNewCommentInput(evt));
    KeyHandler.add('cmd+Enter', this.#onFormSubmit);

    this.element.addEventListener('scroll', (evt) => this.#onDetailsScroll(evt));

    this.#form.querySelector('.film-details__comments-list').addEventListener('click', (evt) => this.#onCommentDelete(evt));
  };

  render() {
    render(this, this.#container);
    this._restoreHandlers();
  }

  close() {
    this.removeFromDOM();
  }

  // Назначение внешних обработчиков событий
  setControlChangeHandler(callback) {
    this.#callback.controlChange = callback;
  }

  setCloseButtonClickHandler(callback) {
    this.#callback.closeButtonClick = callback;
  }

  setFormSubmitHandler(callback) {
    this.#callback.formSubmit = callback;
  }

  setCommentDeleteHandler(callback) {
    this.#callback.commentDelete = callback;
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

  // Выполнение внутренних обработчиков
  #onFormSubmit = () => {
    if (this.#newCommentEmoji && this.#newCommentText) {
      this.#callback.formSubmit({
        comment: this.#newCommentText,
        emotion: this._state.newComment.emoji,
        filmId: this.#film.id
      });
    }
    KeyHandler.remove('cmd+Enter', this.#onFormSubmit);
  };

  #onCommentEmojiChange = (evt) => {
    evt.preventDefault();
    this.#newCommentEmoji = evt.target.value;
    if (evt.target.name === 'comment-emoji') {
      this.updateElement({
        newComment: {
          emoji: this.#newCommentEmoji,
          text: this.#newCommentText
        },
        scrollTop: this.#currentScrollTop
      });
    }
  };

  #onNewCommentInput = (evt) => {
    if (evt.target.name === 'comment') {
      this.#newCommentText = evt.target.value;
    }
  };

  #onDetailsScroll = (evt) => {
    this.#currentScrollTop = evt.target.scrollTop;
  };

  #onCommentDelete = (evt) => {
    evt.preventDefault();
    if (evt.target.dataset.id) {
      this.#callback.commentDelete(
        {
          filmId: this.#film.id,
          commentId: evt.target.dataset.id
        }
      );
    }
  };
}
