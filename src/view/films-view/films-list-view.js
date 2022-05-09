import {View} from '../view';

const createFilmListTemplate = (type) => `
    <section class="films-list ${type ? type : ''}">
    </section>
`;

class FilmsListView extends View{
  #type;

  constructor(type = '') {
    super();
    this.#type = type;
  }

  getTemplate() {
    return createFilmListTemplate(this.#type);
  }
}

export {FilmsListView};
