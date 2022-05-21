import {MockService} from './mock-service';

class DataModel {
  #data;

  loadData() {
    if (!this.#data) {
      this.#data = new MockService(12, 6);
    }
    return this.#data;
  }

  loadUserData() {
    return this.#data.userData;
  }
}

export {DataModel};
