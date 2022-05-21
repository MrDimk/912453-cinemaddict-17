import {render} from '../framework/render';
import {FilmsView} from '../view/films-view/films-view';
import {FilmsListPresenter} from './films-list-presenter';

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

class FilmsPresenter {
  #filmsContent;
  #data;
  #profilePresenter;
  #filterPresenter;
  #sortPresenter;
  #footerPresenter;

  constructor() {
    this.#filmsContent = new FilmsView();
  }

  init(container, data) {
    this.#data = data;
    this.topRatedData = {
      films: data.films.slice(0, 2),
      comments: data.comments.slice()
    };
    this.mostCommentedData = {
      films: data.films.slice(0, 2),
      comments: data.comments.slice()
    };

    render(this.#filmsContent, container);

    // Создаем три списка фильмов, пока для каждого списка при создании отличаются входные данные,
    // далее после реализации фильтра и сортировки, исходные данные скорее всего будут преобразовываться внутри каждого списка
    // и уже после отрисовываться в DOM
    this.allFilmsList = new FilmsListPresenter(
      this.#data,
      this.#filmsContent.element,
      filmsListTypes.main.title,
      filmsListTypes.main.isHidden);

    this.filmsTopRatedList = new FilmsListPresenter(
      this.topRatedData,
      this.#filmsContent.element,
      filmsListTypes.topRated.title,
      filmsListTypes.topRated.isHidden,
      filmsListTypes.topRated.length,
      filmsListTypes.topRated.class);

    this.filmsMostCommentedList = new FilmsListPresenter(
      this.mostCommentedData,
      this.#filmsContent.element,
      filmsListTypes.mostCommented.title,
      filmsListTypes.mostCommented.isHidden,
      filmsListTypes.mostCommented.length,
      filmsListTypes.mostCommented.class);
  }
}

export {FilmsPresenter};
