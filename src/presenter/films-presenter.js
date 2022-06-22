import {render} from '../framework/render';
import FilmsView from '../view/films-view/films-view';
import FilmsListPresenter from './films-list-presenter';

const filmsListTypes = {
  main: {
    title: 'All movies. Upcoming',
    isHidden: true,
    length: 5
  },
  topRated: {
    title: 'Top rated',
    class: 'films-list--extra',
    length: 2
  },
  mostCommented: {
    title: 'Most commented',
    class: 'films-list--extra',
    length: 2
  }
};

export default class FilmsPresenter {
  #listsContainer;
  #model;
  #container;
  #filterModel;

  constructor(container, model, filterModel) {
    this.#listsContainer = new FilmsView();
    this.#container = container;
    this.#model = model;
    this.#filterModel = filterModel;
  }

  get model() {
    return this.#model;
  }

  init = () => {
    render(this.#listsContainer, this.#container);

    this.allFilmsList = new FilmsListPresenter(
      this.#model,
      this.#listsContainer.element,
      this.#filterModel,
      filmsListTypes.main.title,
      filmsListTypes.main.isHidden);

    this.allFilmsList.setFilter(this.#filterModel);
    this.allFilmsList.initSort(this.#container);
  };
}
