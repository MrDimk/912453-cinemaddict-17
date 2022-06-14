import {render} from '../framework/render';
import FilmCardView from '../view/films-view/film-card-view';
import FilmDataAdapter from './film-data-adapter';
import FilmDetailsView from '../view/films-view/film-details-view';
import KeyHandler from '../util';

// Управляет логикой одного фильма: паказ карточки и деталей, обработчики событий
export default class FilmPresenter {
  #filmData;
  #comments;
  #container;
  #filmCardView;
  #filmDetailsView;

  constructor(filmData, comments, container) {
    this.#filmData = new FilmDataAdapter(filmData);
    this.#comments = comments;
    this.#container = container;
    this.#filmCardView = new FilmCardView(this.#filmData);
    this.#filmDetailsView = new FilmDetailsView(this.#filmData, this.#comments, document.body);

    this.#filmCardView.setControlChangeHandler(this.#onControlChange);
    this.#filmDetailsView.setControlChangeHandler(this.#onControlChange);
  }

  showCard() {
    render(this.#filmCardView, this.#container);
    this.#filmCardView.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.showDetails(document.body);
    });
  }

  hideCard() {
    this.#filmCardView.removeFromDOM();
  }

  showDetails() {
    if (FilmDetailsView.currentDetailsPopup !== this.#filmDetailsView) {
      if (FilmDetailsView.currentDetailsPopup) {
        FilmDetailsView.currentDetailsPopup.removeFromDOM();
      }
      this.#filmDetailsView.render();
      document.body.classList.add('hide-overflow');
      this.#filmDetailsView.setCloseButtonClickHandler(this.#onCloseDetails);
      KeyHandler.add('esc', this.#onCloseDetails);
      FilmDetailsView.currentDetailsPopup = this.#filmDetailsView;
    }
  }

  #onCloseDetails = () => {
    document.body.classList.remove('hide-overflow');
    this.#filmDetailsView.removeFromDOM();
    FilmDetailsView.clearCurrentDetailsPopup();
    KeyHandler.remove(this.#onCloseDetails);
  };

  #onControlChange = (controlType) => {
    const newState = !this.#filmData[controlType];
    this.#filmData[controlType] = newState;
    this.#filmCardView.switchState(this.#filmCardView.buttons[controlType], newState);
    this.#filmDetailsView.switchState(this.#filmDetailsView.buttons[controlType], newState);
  };
}
