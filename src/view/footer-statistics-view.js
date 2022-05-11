import {View} from './view';

const createFooterTemplate = (count) => `
  <p>${count} movies inside</p>
`;

class FooterStatisticsView extends View{
  constructor(data) {
    super();
    this.filmsCount = data.films.length;
  }

  getTemplate() {
    return createFooterTemplate(this.filmsCount);
  }
}

export {FooterStatisticsView};
