import {View} from '../view';

const createFilmsListContainerTemplate = () => '<div class="films-list__container"></div>';

class FilmsListContainerView extends View {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}

export {FilmsListContainerView};
