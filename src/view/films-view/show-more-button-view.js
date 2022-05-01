import {View} from '../view';

const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreButtonView extends View {
  constructor() {
    super();
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}

export {ShowMoreButtonView};
