import Observable from '../framework/observable';

export default class Model extends Observable {
  #serverAPI;

  constructor(serverAPI) {
    super();
    this.#serverAPI = serverAPI;
  }

  get films() {
    return this.#serverAPI.load().films;
  }

  get comments() {
    return this.#serverAPI.load().comments;
  }

  loadComments = () => this.#serverAPI.load().comments;

  get user() {
    return this.#serverAPI.load().userData;
  }

  set films(update) {
    this.#serverAPI.films = update;
  }

  updateFilm(updateType, update) {
    this.#serverAPI.updateFilm(update);
    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const newCommentId = this.#serverAPI.uploadNewComment(update);
    const index = this.films.findIndex((film) => film.id === update.filmId);
    const updatedFilm = {...this.films[index]};
    updatedFilm.comments.push(newCommentId);

    this.updateFilm(updateType, updatedFilm);
  }

  deleteComment(updateType, deletedCommentInfo) {
    this.#serverAPI.deleteComment(deletedCommentInfo.commentId);
    const index = this.films.findIndex((film) => film.id === deletedCommentInfo.filmId);
    const relatedFilm = {...this.films[index]};
    const commentIndex = relatedFilm.comments.indexOf(Number(deletedCommentInfo.commentId));

    relatedFilm.comments = [
      ...relatedFilm.comments.slice(0, commentIndex),
      ...relatedFilm.comments.slice(commentIndex + 1)
    ];

    this.updateFilm(updateType, relatedFilm);
  }
}
