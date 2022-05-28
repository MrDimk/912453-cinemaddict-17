import {render} from '../framework/render';
import FilmCardView from '../view/films-view/film-card-view';
import FilmDataAdapter from './film-data-adapter';
import FilmDetailsView from '../view/films-view/film-details-view';
import EscKeyHandler from '../util';

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
    this.#filmDetailsView = new FilmDetailsView(this.#filmData, this.#comments);

    this.#filmCardView.setWatchlistChangeHandler(this.#onWatchlistChange);
    this.#filmCardView.setWatchedChangeHandler(this.#onWatchedChange);
    this.#filmCardView.setFavoriteChangeHandler(this.#onFavoriteChange);

    this.#filmDetailsView.setWatchlistChangeHandler(this.#onWatchlistChange);
    this.#filmDetailsView.setWatchedChangeHandler(this.#onWatchedChange);
    this.#filmDetailsView.setFavoriteChangeHandler(this.#onFavoriteChange);
  }

  showCard() {
    render(this.#filmCardView, this.#container);
    this.#filmCardView.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.showDetails(document.body);
    });
  }

  showDetails(container) {
    if (FilmDetailsView.currentDetailsPopup !== this.#filmDetailsView) {
      if (FilmDetailsView.currentDetailsPopup) {
        FilmDetailsView.currentDetailsPopup.removeFromDOM();
      }
      render(this.#filmDetailsView, container);
      document.body.classList.add('hide-overflow');
      this.#filmDetailsView.setCloseButtonClickHandler(this.#onCloseDetails);
      EscKeyHandler.add(this.#onCloseDetails);
      FilmDetailsView.currentDetailsPopup = this.#filmDetailsView;
    }
  }

  #onCloseDetails = () => {
    document.body.classList.remove('hide-overflow');
    this.#filmDetailsView.removeFromDOM();
    FilmDetailsView.clearCurrentDetailsPopup();
    EscKeyHandler.remove(this.#onCloseDetails);
  };

  #onWatchlistChange = () => {
    if (this.#filmData.watchlist) {
      this.#filmData.watchlist = false;
      this.#filmDetailsView.watchlistButtonOff();
      this.#filmCardView.watchlistButtonOff();
    } else {
      this.#filmData.watchlist = true;
      this.#filmDetailsView.watchlistButtonOn();
      this.#filmCardView.watchlistButtonOn();
    }
  };

  #onWatchedChange = () => {
    if (this.#filmData.watched) {
      this.#filmData.watched = false;
      this.#filmDetailsView.watchedButtonOff();
      this.#filmCardView.watchedButtonOff();
    } else {
      this.#filmData.watched = true;
      this.#filmDetailsView.watchedButtonOn();
      this.#filmCardView.watchedButtonOn();
    }
  };

  #onFavoriteChange = () => {
    if (this.#filmData.favorite) {
      this.#filmData.favorite = false;
      this.#filmDetailsView.favoriteButtonOff();
      this.#filmCardView.favoriteButtonOff();
    } else {
      this.#filmData.favorite = true;
      this.#filmDetailsView.favoriteButtonOn();
      this.#filmCardView.favoriteButtonOn();
    }
  };
}
