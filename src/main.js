import FilmsPresenter from './presenter/films-presenter';
import DataModel from './model/model';
import ProfilePresenter from './presenter/profile-presenter';
import FilterPresenter from './presenter/filter-presenter';
import FooterPresenter from './presenter/footer-presenter';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const dataModel = new DataModel();
const data = dataModel.loadData();
const profileData = dataModel.loadUserData();

const filmsPresenter = new FilmsPresenter(mainElement);
const profilePresenter = new ProfilePresenter(profileData);
const filterPresenter = new FilterPresenter(data);
const footerPresenter = new FooterPresenter(data);

profilePresenter.init(headerElement);
filmsPresenter.init(data);
filterPresenter.init(mainElement);
footerPresenter.init(footerStatisticsElement);
