import {ProfileView} from '../view/profile-view';
import {render} from '../framework/render';

class ProfilePresenter {
  #profile;
  #profileView;
  constructor(user) {
    this.#profile = user;
    this.#profileView = new ProfileView(this.#profile);
  }

  init(container) {
    render(this.#profileView, container);
  }
}

export {ProfilePresenter};
