import AbstractView from '../../framework/view/abstract-view';

const createFilmsTemplate = () => '<section class="films"></section>';

class FilmsView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createFilmsTemplate();
  }
}

export {FilmsView};
