import {FilterType} from './const';

export default class KeyHandler {
  static #escHandlers = new Set();
  static #cmdEnterHandlers = new Set();

  static get escHandlers() {
    return this.#escHandlers;
  }

  static get cmdEnterHandlers() {
    return this.#cmdEnterHandlers;
  }

  static #onKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      KeyHandler.escHandlers.forEach((handler) => handler());
    } else if (evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      evt.preventDefault();
      KeyHandler.cmdEnterHandlers.forEach((handler) => handler());
    }
  }

  static add(key, callback) {

    if (this.#escHandlers.size === 0) {
      document.addEventListener('keydown', this.#onKeydown);
    }
    switch (key) {
      case 'esc':
        this.#escHandlers.add(callback);
        break;
      case 'cmd+Enter':
        this.#cmdEnterHandlers.add(callback);
        break;
    }
  }

  static remove(key, callback) {
    switch (key) {
      case 'esc':
        this.#escHandlers.delete(callback);
        break;
      case 'cmd+Enter':
        this.#cmdEnterHandlers.delete(callback);
        break;
    }
    if (this.#escHandlers.size === 0) {
      document.removeEventListener('keydown', this.#onKeydown);
    }
    if (this.#escHandlers.size === 0) {
      document.removeEventListener('keydown', this.#onKeydown);
    }
  }
}

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film['user_details'].watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film['user_details']['already_watched']),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film['user_details'].favorite),
};

export {filter};
