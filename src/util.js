
export default class KeyHandler {
  static #escHandlers = new Set();
  static #cmdEnterHandlers = new Set();

  static get escHandlers() {
    return this.#escHandlers;
  }

  static get cmdEnterHandlers() {
    return this.#cmdEnterHandlers;
  }

  static #onEscKeydown(evt) {
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
      document.addEventListener('keydown', this.#onEscKeydown);
    }
    switch (key) {
      case 'esc':
        this.#escHandlers.add(callback);
        break;
      case 'cmd+enter':
        this.#cmdEnterHandlers.add(callback);
        break;
    }
  }

  static remove(key, callback) {
    switch (key) {
      case 'esc':
        this.#escHandlers.delete(callback);
        break;
      case 'cmd+enter':
        this.#cmdEnterHandlers.delete(callback);
        break;
    }
    if (this.#escHandlers.size === 0) {
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
    if (this.#escHandlers.size === 0) {
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  }
}
