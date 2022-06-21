import FilmsPresenter from './presenter/films-presenter';
import Model from './model/model';
import ProfilePresenter from './presenter/profile-presenter';
import FilterPresenter from './presenter/filter-presenter';
import FooterPresenter from './presenter/footer-presenter';
import ServerAPI from './server-api';
import FilterModel from './model/filter-model';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const serverAPI = new ServerAPI();
const model = new Model(serverAPI);  //обновленная модель получает на вход объект для коммунизации с сервером
const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter(mainElement, model, filterModel);
const profilePresenter = new ProfilePresenter(model);
const filterPresenter = new FilterPresenter(mainElement, model, filterModel);
const footerPresenter = new FooterPresenter(model);

profilePresenter.init(headerElement);
filmsPresenter.init();
filterPresenter.init();
footerPresenter.init(footerStatisticsElement);
