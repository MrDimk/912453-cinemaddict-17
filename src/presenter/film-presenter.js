import {render} from '../render';
import {FilmCardView} from '../view/films-view/film-card-view';
import {FilmDataAdapter} from './film-data-adapter';
import {FilmDetailsView} from '../view/films-view/film-details-view';

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
    this.#filmDetailsView.element.querySelector('.film-details__close').addEventListener('click', () => this.onCloseDetails());
    document.addEventListener('keydown', this.onEscKeydown);
  }

  onCloseDetails() {
    this.#filmDetailsView.element.remove();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.onEscKeydown);
  }

  onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.onCloseDetails();
    }
  };
}

export {FilmPresenter};
