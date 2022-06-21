import {render, RenderPosition} from '../framework/render';
import FilmPresenter from './film-presenter';
import FilmsListView from '../view/films-view/films-list-view';
import FilmsTitleView from '../view/films-view/films-list-title-view';
import FilmsListContainerView from '../view/films-view/films-list-container-view';
import ShowMoreButtonView from '../view/films-view/show-more-button-view';
import SortPresenter from './sort-presenter';

import {EMPTY_LIST_MESSAGES, UserAction, UpdateType} from '../const';
import {filter} from '../util';

// Класс описывает списки фильмов на сайте, их заголовок, стиль, содержимое и порядок его отображения
export default class FilmsListPresenter {
  #model;
  #title;
  #titleView;
  #container;
  #filmsListContainerView;
  #filmsPresentersMap;
  #cardsPerPage;
  #cardsOnPageCounter = 0;
  #filmsListView;
  #isHidden;
  #defaultSortType;
  #showMoreButton = null;
  #filter = null;
  #sortPresenter;
  #filterModel = null;
  #filmsData;

  constructor(model, container, filterModel = null, title = '', isHidden = false, cardsPerPage = 5, type = '') {
    this.#model = model;
    this.#container = container;
    this.#filterModel = filterModel;
    this.#title = title;
    this.#cardsPerPage = cardsPerPage;
    this.#isHidden = isHidden;
    this.#defaultSortType = 'default';
    this.#filmsListView = new FilmsListView(type);
    this.#filmsListContainerView = new FilmsListContainerView();
    this.#filmsPresentersMap = new Map();

    this.#filmsData = this.getFilms();

    this.#model.addObserver(this.#modelEventHandler);


    render(this.#filmsListView, this.#container);
    render(this.#filmsListContainerView, this.#filmsListView.element);

    this.createFilmsList(this.getFilms());
    this.renderTitle();
    this.renderFilmsCards();
  }

  getFilms = () => this.#filterModel ?
    filter[this.#filterModel.filter](this.#model.films) :
    this.#model.films;

  setFilter = (filterModel) => {
    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#filterModelEventHandler);
  };

  initSort(container) {
    this.#sortPresenter = new SortPresenter(this.getFilms);
    this.#sortPresenter.addSortUpdateListener(this.updateFilmsList);
    this.#sortPresenter.init(container);
  }

  updateFilmsList = (updatedList) => {
    this.#filmsData = updatedList;
    for (const film of this.#filmsPresentersMap.values()) {
      film.hideCard();
    }
    this.#cardsOnPageCounter = 0;
    this.renderFilmsCards();
  };

  createFilmsList(filmsData) {
    for (let i = 0; i < this.#filmsData.length; i++) {
      const newFilm = new FilmPresenter(filmsData[i], this.#model.loadComments, this.#filmsListContainerView.element, this.#viewActionHandler);
      this.#filmsPresentersMap.set(filmsData[i].id, newFilm);
    }
  }

  renderFilmsCards = (countMore = this.#cardsPerPage) => {
    let count = Math.min(this.#filmsData.length, this.#cardsOnPageCounter);
    for (count; (count < this.#cardsOnPageCounter + countMore) && (count < this.#filmsData.length); count++) {
      this.#filmsPresentersMap.get(this.#filmsData[count].id).showCard();
    }
    if (count < this.#filmsData.length) {
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

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmsPresentersMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MOJOR:
        break;
    }
  };

  #filterModelEventHandler = () => this.#sortPresenter.setSort(this.#defaultSortType, true);

  #viewActionHandler = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#model.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#model.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#model.deleteComment(updateType, update);
        break;
    }
  };
}
