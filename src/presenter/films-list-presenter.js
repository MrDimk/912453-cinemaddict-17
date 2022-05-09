import {render, RenderPosition} from '../render';
import {FilmPresenter} from './film-presenter';
import {FilmsListView} from '../view/films-view/films-list-view';
import {FilmsTitleView} from '../view/films-view/films-list-title-view';
import {FilmsListContainerView} from '../view/films-view/films-list-container-view';
import {ShowMoreButtonView} from '../view/films-view/show-more-button-view';

// Класс описывает списки фильмов на сайте, их заголовокб стильб содержимое и порядок его отображения
class FilmsListPresenter {
  #filmsData;
  #comments;
  #title;
  #titleView;
  #container;
  #filmsListContainerView;
  #filmsList = [];
  #cardsPerPage;
  #cardsOnPageCounter = 0;
  #filmsListView;
  #isHidden;
  #showMoreButton = null;

  constructor(data, container, title = '', isHidden = false, cardsPerPage = 5, type = '') {
    this.#filmsData = data.films;
    this.#comments = data.comments;
    this.#container = container;
    this.#title = title;
    this.#cardsPerPage = cardsPerPage;
    this.#isHidden = isHidden;
    this.#filmsListView = new FilmsListView(type);
    this.#filmsListContainerView = new FilmsListContainerView();

    render(this.#filmsListView, this.#container);
    render(this.#filmsListContainerView, this.#filmsListView.element);

    this.createFilmsList(this.#filmsData, this.#comments);
    this.renderTitle();
    this.renderFilmsCards();
  }

  createFilmsList(filmsData, comments) {
    for (let i = 0; i < this.#filmsData.length; i++) {
      const filmComments = comments.filter((comment) => this.#filmsData[i].comments.some((id) => comment.id === id));
      this.#filmsList.push(new FilmPresenter(filmsData[i], filmComments ));
    }
  }

  renderFilmsCards(countMore = this.#cardsPerPage) {
    let count = this.#cardsOnPageCounter;
    for (count; (count < this.#cardsOnPageCounter + countMore) && (count < this.#filmsList.length); count++) {
      this.#filmsList[count].showCard(this.#filmsListContainerView.element);
    }
    if (count < this.#filmsList.length) {
      this.renderShoeMoreButton();
    } else {
      this.removeShowMoreButton();
    }
    this.#cardsOnPageCounter = count;
  }

  renderShoeMoreButton() {
    if (this.#showMoreButton) {
      this.removeShowMoreButton();
    }
    this.#showMoreButton = new ShowMoreButtonView();
    render(this.#showMoreButton, this.#filmsListView.element);
    this.#showMoreButton.element.addEventListener('click', () => this.renderFilmsCards());
  }

  removeShowMoreButton() {
    if (this.#showMoreButton) {
      this.#showMoreButton.element.remove();
      this.#showMoreButton.removeElement();
    }
  }

  renderTitle(titleText = this.#title, isHidden = this.#isHidden) {
    if (this.#titleView) {
      this.#titleView.removeElement();
    }
    this.#titleView = new FilmsTitleView(titleText, isHidden);
    render(this.#titleView, this.#filmsListContainerView.element, RenderPosition.BEFOREBEGIN);
  }
}

export {FilmsListPresenter};
