import AbstractView from '../framework/view/abstract-view';

const createNewProfileElement = ({name, avatar}) => `
<section class="header__profile profile">
    <p class="profile__rating">${name}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>
`;

class ProfileView extends AbstractView {
  #profile;
  constructor(profile) {
    super();
    this.#profile = profile;
  }

  get template() {
    return createNewProfileElement(this.#profile);
  }
}

export {ProfileView};
