import {render} from '../render';
import {FilmsView} from '../view/films-view/films-view';
import {FilmsListView} from '../view/films-view/films-list-view';
import {FilmsTitleView} from '../view/films-view/films-list-title-view';
import {FilmsListContainerView} from '../view/films-view/films-list-container-view';
import {FilmCardView} from '../view/films-view/film-card-view';
import {ShowMoreButtonView} from '../view/films-view/show-more-button-view';
import {FilmDetailsView} from '../view/films-view/film-details-view';
import {FilmCardAdapter} from '../view/films-view/film-view-adapter';

const filmsListTypes = {
  main: {
    title: 'All movies. Upcoming',
    titleHidden: true,
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
  filmsContent = new FilmsView();

  allFilmsList = new FilmsListView();
  allFilmsListTitle = new FilmsTitleView(filmsListTypes.main.title, filmsListTypes.main.titleHidden);
  allFilmsListContainer = new FilmsListContainerView();
  showMoreButton = new ShowMoreButtonView();

  filmsTopRatedList = new FilmsListView(filmsListTypes.topRated.class);
  filmsTopRatedListTitle = new FilmsTitleView(filmsListTypes.topRated.title);
  filmsTopRatedListContainer = new FilmsListContainerView();

  filmsMostCommentedList = new FilmsListView(filmsListTypes.mostCommented.class);
  filmsMostCommentedListTitle = new FilmsTitleView(filmsListTypes.mostCommented.title);
  filmsMostCommentedListContainer = new FilmsListContainerView();

  init(container, data) {

    this.data = data;

    render(this.filmsContent, container);

    render(this.allFilmsList, this.filmsContent.getElement());
    render(this.allFilmsListTitle, this.allFilmsList.getElement());
    render(this.allFilmsListContainer, this.allFilmsList.getElement());
    render(this.showMoreButton, this.allFilmsList.getElement());

    render(this.filmsTopRatedList, this.filmsContent.getElement());
    render(this.filmsTopRatedListTitle, this.filmsTopRatedList.getElement());
    render(this.filmsTopRatedListContainer, this.filmsTopRatedList.getElement());

    render(this.filmsMostCommentedList, this.filmsContent.getElement());
    render(this.filmsMostCommentedListTitle, this.filmsMostCommentedList.getElement());
    render(this.filmsMostCommentedListContainer, this.filmsMostCommentedListTitle.getElement());

    // Array.from(filmsListTypes.main).forEach((value, index) => render(new FilmCardView(data), this.allFilmsListContainer.getElement()));
    for (const film of this.data.films) {
      render(new FilmCardView(new FilmCardAdapter(film)), this.allFilmsListContainer.getElement());
    }
    // Array.from(filmsListTypes.topRated).forEach(() => render(new FilmCardView(data), this.filmsTopRatedListContainer.getElement()));
    // Array.from(filmsListTypes.mostCommented).forEach(() => render(new FilmCardView(data), this.filmsMostCommentedListContainer.getElement()));
  }

  detailsPopup(container, film) {
    render(new FilmDetailsView(film, this.getComments(film)), container);
  }

  getComments(film) {
    return this.data.comments.filter((comment) => film.comments.some((id) => comment.id === id));
  }


}

export {FilmsPresenter};
