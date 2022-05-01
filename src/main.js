import {render} from './render.js';
import {ProfileView} from './view/profile-view';
import {FilterView} from './view/filter-view.js';
import {SortView} from './view/sort-view.js';
import {FilmsPresenter} from './presenter/films-presenter.js';
import {FooterStatisticsView} from './view/footer-statistics-view.js';

const body = document.body;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const mockData = {movesCount: '130 291'};

const filmsPresenter = new FilmsPresenter();

render(new ProfileView(), headerElement);
render(new FilterView(), mainElement);
render(new SortView(), mainElement);
render(new FooterStatisticsView(mockData.movesCount), footerStatisticsElement);

filmsPresenter.init(mainElement);
filmsPresenter.detailsPopup(body);
