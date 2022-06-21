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

    // Создаем три списка фильмов, пока для каждого списка при создании отличаются входные данные,
    // далее после реализации фильтра и сортировки, исходные данные скорее всего будут преобразовываться внутри каждого списка
    // и уже после отрисовываться в DOM
    this.allFilmsList = new FilmsListPresenter(
      this.#model,
      this.#listsContainer.element,
      this.#filterModel,
      filmsListTypes.main.title,
      filmsListTypes.main.isHidden);

    this.allFilmsList.setFilter(this.#filterModel);
    this.allFilmsList.initSort(this.#container);

    // Готовим данные для списков "tor rates" и "most commented"
    // this.topRatedData = {
    //   films: this.model.films.slice(0, 2),
    //   comments: this.model.comments.slice()
    // };
    // Для сортировка самых комментируемых нужен дополнительный компаратор
    // SortPresenter.addComparator('comments', (a, b) => {
    //   const commentsA = Number(a.comments.length);
    //   const commentsB = Number(b.comments.length);
    //   return commentsA > commentsB ? -1 : 1;
    // });
    // this.mostCommentedData = {
    //   films: this.#model.films.slice(0, 2),
    //   comments: this.#model.comments.slice()
    // };

    // Создаем списки на основе подготовленных данных
    // this.filmsTopRatedList = new FilmsListPresenter(
    //   this.#model,
    //   this.#listsContainer.element,
    //   filmsListTypes.topRated.title,
    //   filmsListTypes.topRated.isHidden,
    //   filmsListTypes.topRated.length,
    //   filmsListTypes.topRated.class);

    // this.filmsTopRatedList.init({
    //   type: 'rating',
    //   length: 2
    // });

    // this.filmsMostCommentedList = new FilmsListPresenter(
    //   this.mostCommentedData,
    //   this.#listsContainer.element,
    //   filmsListTypes.mostCommented.title,
    //   filmsListTypes.mostCommented.isHidden,
    //   filmsListTypes.mostCommented.length,
    //   filmsListTypes.mostCommented.class);
  };
}
