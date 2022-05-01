import {View} from '../view';

const createFilmsTemplate = () => '<section class="films"></section>';

class FilmsView extends View {
  constructor() {
    super();
  }

  getTemplate() {
    return createFilmsTemplate();
  }
}

export {FilmsView};
