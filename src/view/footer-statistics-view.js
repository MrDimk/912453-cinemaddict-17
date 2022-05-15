import AbstractView from '../framework/view/abstract-view';

const createFooterTemplate = (count) => `
  <p>${count} movies inside</p>
`;

class FooterStatisticsView extends AbstractView{
  constructor(data) {
    super();
    this.filmsCount = data.films.length;
  }

  get template() {
    return createFooterTemplate(this.filmsCount);
  }
}

export {FooterStatisticsView};
