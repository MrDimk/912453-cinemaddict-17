import ProfileView from '../view/profile-view';
import {render} from '../framework/render';

export default class ProfilePresenter {
  #model;
  #profileView;
  constructor(model) {
    this.#model = model;
    this.#profileView = new ProfileView(this.#model.user);
  }

  init(container) {
    render(this.#profileView, container);
  }
}

