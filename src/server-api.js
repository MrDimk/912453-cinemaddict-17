import MockService from './mock-service';

export default class ServerAPI {
  #data;

  constructor() {
    this.#data = new MockService(12, 6);
  }

  load = () => this.#data;

  loadUserData = () => this.#data.userData;

  updateFilm = (update) => {
    const index = this.#data.films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#data.films = [
      ...this.#data.films.slice(0, index),
      update,
      ...this.#data.films.slice(index + 1)
    ];
  };

  uploadNewComment = (comment) => {
    const newComment = {
      id: this.#data.newId,
      author: 'ServerGiven Name',
      ...comment,
      date: new Date().toString()
    };

    this.#data.comments = [...this.#data.comments, newComment];
    return newComment.id;
  };

  deleteComment = (commentId) => {
    const index = this.#data.comments.findIndex((comment) => comment.id === Number(commentId));

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#data.comments = [
      ...this.#data.comments.slice(0, index),
      ...this.#data.comments.slice(index + 1)
    ];
  };
}
