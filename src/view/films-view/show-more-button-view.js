import AbstractView from '../../framework/view/abstract-view';

const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

class ShowMoreButtonView extends AbstractView {
  #callback = {};
  constructor() {
    super();
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  setOnClickHandler(callback) {
    this.#callback.onClick = callback;
    this.element.addEventListener('click', this.#onClickHandler);
  }

  #onClickHandler = (evt) => {
    evt.preventDefault();
    this.#callback.onClick();
  };
}

export {ShowMoreButtonView};
