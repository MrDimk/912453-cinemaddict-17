import {View} from './view';

const createSortTemplate = () => `
  <ul class="sort">
    <li><a href="#" class="sort__button">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
  </ul>
`;

class SortView extends View{
  getTemplate() {
    return createSortTemplate();
  }
}

export {SortView};
