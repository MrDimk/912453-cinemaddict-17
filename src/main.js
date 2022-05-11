import {render} from './render';
import {ProfileView} from './view/profile-view';
import {FilterView} from './view/filter-view';
import {SortView} from './view/sort-view';
import {FilmsPresenter} from './presenter/films-presenter';
import {FooterStatisticsView} from './view/footer-statistics-view';
import {DataModel} from './model/model';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const dataModel = new DataModel();
const data = dataModel.loadData();

const filmsPresenter = new FilmsPresenter();

render(new ProfileView(), headerElement);
render(new FilterView(), mainElement);
render(new SortView(), mainElement);
render(new FooterStatisticsView(data), footerStatisticsElement);

filmsPresenter.init(mainElement, data);

