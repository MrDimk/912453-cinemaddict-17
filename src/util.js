
class EscKeyHandler {
  static #handlers = new Set();

  static get handlers() {
    return this.#handlers;
  }

  static #onEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      EscKeyHandler.handlers.forEach((handler) => handler());
    }
  }

  static add(callback) {
    if (this.#handlers.size === 0) {
      document.addEventListener('keydown', this.#onEscKeydown);
    }
    this.#handlers.add(callback);
  }

  static remove(callback) {
    this.#handlers.delete(callback);
    if (this.#handlers.size === 0) {
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  }
}

export {EscKeyHandler};
