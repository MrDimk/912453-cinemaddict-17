import {render, RenderPosition} from '../framework/render';
import FilmPresenter from './film-presenter';
import FilmsListView from '../view/films-view/films-list-view';
import FilmsTitleView from '../view/films-view/films-list-title-view';
import FilmsListContainerView from '../view/films-view/films-list-container-view';
import ShowMoreButtonView from '../view/films-view/show-more-button-view';
import SortPresenter from './sort-presenter';

const EMPTY_LIST_MESSAGES = {
  allMovies: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now'
};

// Класс описывает списки фильмов на сайте, их заголовок, стиль, содержимое и порядок его отображения
export default class FilmsListPresenter {
  #filmsData;
  #comments;
  #title;
  #titleView;
  #container;
  #filmsListContainerView;
  #filmsPresentersMap;
  #cardsPerPage;
  #cardsOnPageCounter = 0;
  #filmsListView;
  #isHidden;
  #showMoreButton = null;
  #filter = null;
  #sortPresenter;


  constructor(data, container, title = '', isHidden = false, cardsPerPage = 5, type = '') {
    this.#filmsData = data.films;
    this.#comments = data.comments;
    this.#container = container;
    this.#title = title;
    this.#cardsPerPage = cardsPerPage;
    this.#isHidden = isHidden;
    this.#filmsListView = new FilmsListView(type);
    this.#filmsListContainerView = new FilmsListContainerView();
    this.#filmsPresentersMap = new Map();

    render(this.#filmsListView, this.#container);
    render(this.#filmsListContainerView, this.#filmsListView.element);

    this.createFilmsList(this.#filmsData, this.#comments);
    this.renderTitle();
    this.renderFilmsCards();
  }

  initSort(container) {
    this.#sortPresenter = new SortPresenter(this.#filmsData);
    this.#filmsData = this.#sortPresenter.sortBy('default');
    this.#sortPresenter.addSortUpdateListener(this.updateFilmsList);
    this.#sortPresenter.init(container);
  }

  updateFilmsList = (updatedList) => {
    this.#filmsData = updatedList;
    for (const film of this.#filmsPresentersMap.values()) {
      film.hideCard();
    }
    const rerenderCardsCount = this.#cardsOnPageCounter;
    this.#cardsOnPageCounter = 0;
    this.renderFilmsCards(rerenderCardsCount);
  };

  createFilmsList(filmsData, comments) {
    for (let i = 0; i < this.#filmsData.length; i++) {
      const filmComments = comments.filter((comment) => this.#filmsData[i].comments.some((id) => comment.id === id));
      const newFilm = new FilmPresenter(filmsData[i], filmComments, this.#filmsListContainerView.element);
      this.#filmsPresentersMap.set(filmsData[i].id, newFilm);
    }
  }

  renderFilmsCards = (countMore = this.#cardsPerPage) => {
    let count = this.#cardsOnPageCounter;
    for (count; (count < this.#cardsOnPageCounter + countMore) && (count < this.#filmsPresentersMap.size); count++) {
      this.#filmsPresentersMap.get(this.#filmsData[count].id).showCard();
    }
    if (count < this.#filmsPresentersMap.size) {
      this.#renderShowMoreButton();
    } else {
      this.#removeShowMoreButton();
    }
    this.#cardsOnPageCounter = count;
  };

  #renderShowMoreButton() {
    if (this.#showMoreButton) {
      this.#removeShowMoreButton();
    }
    this.#showMoreButton = new ShowMoreButtonView();
    render(this.#showMoreButton, this.#filmsListView.element);
    this.#showMoreButton.setOnClickHandler(this.renderFilmsCards);
  }

  #removeShowMoreButton() {
    if (this.#showMoreButton) {
      this.#showMoreButton.removeFromDOM();
    }
  }

  renderTitle(titleText = this.#title, isHidden = this.#isHidden) {
    // Заголовок будем визуализировать при инициализации а также при каждом применении фильтра можно выдавать релевантное сообщение
    // поэтому проверку на пустой список лучше прямо тут реализовать
    // пока предусматриваем только один "case", а проверку только на пустой #filmsList,
    // при реализации фильтров будем дополнять логику
    if (this.#filmsPresentersMap.length === 0) {
      isHidden = false;
      switch (this.#filter) {
        case null:
          titleText = EMPTY_LIST_MESSAGES.allMovies;
          break;
      }
    }
    if (this.#titleView) {
      this.#titleView.removeElement();
    }
    this.#titleView = new FilmsTitleView(titleText, isHidden);
    render(this.#titleView, this.#filmsListContainerView.element, RenderPosition.BEFOREBEGIN);
  }
}
