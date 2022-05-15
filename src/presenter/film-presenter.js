import {render} from '../framework/render';
import {FilmCardView} from '../view/films-view/film-card-view';
import {FilmDataAdapter} from './film-data-adapter';
import {FilmDetailsView} from '../view/films-view/film-details-view';
import {EscKeyHandler} from '../util';

// Управляет логикой одного фильма: паказ карточки и деталей, обработчики событий
class FilmPresenter {
  #filmData;
  #comments;
  #filmCardView;
  #filmDetailsView;

  constructor(filmData, comments) {
    this.#filmData = new FilmDataAdapter(filmData);
    this.#comments = comments;
    this.#filmCardView = new FilmCardView(this.#filmData);
    this.#filmDetailsView = new FilmDetailsView(this.#filmData, this.#comments);
  }

  showCard(container){
    render(this.#filmCardView, container);
    this.#filmCardView.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.showDetails(document.body);
    });
  }

  showDetails(container){
    render(this.#filmDetailsView, container);
    document.body.classList.add('hide-overflow');
    this.#filmDetailsView.setCloseButtonClickHandler(this.#onCloseDetails);
    EscKeyHandler.add(this.#onCloseDetails);
  }

  #onCloseDetails = () => {
    document.body.classList.remove('hide-overflow');
    this.#filmDetailsView.element.remove();
    EscKeyHandler.remove(this.#onCloseDetails);
  };
}

export {FilmPresenter};
