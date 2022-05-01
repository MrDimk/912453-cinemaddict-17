import {View} from './view';

const createFooterTemplate = (count) => `
  <p>${count} movies inside</p>
`;

class FooterStatisticsView extends View{
  constructor(count) {
    super();
    this.filmsCount = count;
  }

  getTemplate() {
    return createFooterTemplate(this.filmsCount);
  }
}

export {FooterStatisticsView};
