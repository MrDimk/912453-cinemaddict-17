import {render} from './render';
import {ProfileView} from './view/profile-view';
import {FilterView} from './view/filter-view';
import {SortView} from './view/sort-view';
import {FilmsPresenter} from './presenter/films-presenter';
import {FooterStatisticsView} from './view/footer-statistics-view';

const body = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const mockData = {moviesCount: '130 291'};

const filmsPresenter = new FilmsPresenter();

render(new ProfileView(), headerElement);
render(new FilterView(), mainElement);
render(new SortView(), mainElement);
render(new FooterStatisticsView(mockData.moviesCount), footerStatisticsElement);

filmsPresenter.init(mainElement);
filmsPresenter.detailsPopup(body);
