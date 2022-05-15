import AbstractView from '../../framework/view/abstract-view';

const createFilmsListContainerTemplate = () => '<div class="films-list__container"></div>';

class FilmsListContainerView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createFilmsListContainerTemplate();
  }
}

export {FilmsListContainerView};
