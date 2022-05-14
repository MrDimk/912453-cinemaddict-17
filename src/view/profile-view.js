import AbstractView from '../framework/view/abstract-view';

const createNewProfileElement = () => `
<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`;

class ProfileView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createNewProfileElement();
  }
}

export {ProfileView};
