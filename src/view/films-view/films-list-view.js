import AbstractView from '../../framework/view/abstract-view';

const createFilmListTemplate = (type) => `
    <section class="films-list ${type ? type : ''}">
    </section>
`;

export default class FilmsListView extends AbstractView {
  #type;

  constructor(type = '') {
    super();
    this.#type = type;
  }

  get template() {
    return createFilmListTemplate(this.#type);
  }
}
