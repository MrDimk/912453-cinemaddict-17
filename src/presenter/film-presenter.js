import {remove, render, replace} from '../framework/render';
import FilmCardView from '../view/films-view/film-card-view';
import FilmDetailsView from '../view/films-view/film-details-view';
import KeyHandler from '../util';
import {UserAction, UpdateType} from '../const';

// Управляет логикой одного фильма: паказ карточки и деталей, обработчики событий
export default class FilmPresenter {
  #film;
  #container;
  #filmCardView;
  #filmDetailsView;
  #changeData;

  constructor(film, loadComments, container, changeData) {
    this.loadComments = loadComments;
    this.#container = container;
    this.#changeData = changeData;

    this.init(film);
  }

  init(film) {
    this.#film = film;

    const prevFilmCardView = this.#filmCardView || null;
    const prevFilmDetailsView = this.#filmDetailsView || null;

    this.#filmCardView = new FilmCardView(this.#film);
    this.#filmDetailsView = new FilmDetailsView(this.#film, this.loadComments, document.body);

    this.#filmCardView.setControlChangeHandler(this.#onControlChange);
    this.#filmDetailsView.setControlChangeHandler(this.#onControlChange);
    this.#filmDetailsView.setFormSubmitHandler(this.#onCommentAdd);
    this.#filmDetailsView.setCommentDeleteHandler(this.#onCommentDelete);

    this.#filmCardView.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.showDetails(document.body);
    });

    if (prevFilmCardView) {
      replace(this.#filmCardView, prevFilmCardView);
    }
    if (FilmDetailsView.currentDetailsPopup && FilmDetailsView.currentDetailsPopup === prevFilmDetailsView) {
      const currentScroll = prevFilmDetailsView.getCurrentScroll();
      this.#filmDetailsView.newCommentText = prevFilmDetailsView.newCommentText;
      this.#filmDetailsView.newCommentEmoji = prevFilmDetailsView.newCommentEmoji;
      this.#onCloseDetails(prevFilmDetailsView);
      this.showDetails();
      this.#filmDetailsView.restoreScroll(currentScroll);
    }
    remove(prevFilmCardView);
  }

  showCard() {
    render(this.#filmCardView, this.#container);
  }

  hideCard() {
    this.#filmCardView.removeFromDOM();
  }

  showDetails() {
    if (FilmDetailsView.currentDetailsPopup !== this.#filmDetailsView) {
      if (FilmDetailsView.currentDetailsPopup) {
        FilmDetailsView.currentDetailsPopup.removeFromDOM();
      }
      this.#filmDetailsView.init(this.#film);
      document.body.classList.add('hide-overflow');
      this.#filmDetailsView.setCloseButtonClickHandler(this.#onCloseDetails);
      KeyHandler.add('esc', this.#onCloseDetails);
      FilmDetailsView.currentDetailsPopup = this.#filmDetailsView;
    }
  }

  #onCloseDetails = (filmDetails = this.#filmDetailsView) => {
    document.body.classList.remove('hide-overflow');
    filmDetails.close();
    FilmDetailsView.clearCurrentDetailsPopup();
    KeyHandler.remove(this.#onCloseDetails);
  };

  #onControlChange = (control) => {
    const update = {...this.#film};
    update['user_details'][control] = !this.#film['user_details'][control];
    this.#changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, update);
  };

  #onCommentAdd = (newComment) => {
    this.#changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, newComment);
  };

  #onCommentDelete = (deletedCommentInfo) => {
    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, deletedCommentInfo);
  };
}
