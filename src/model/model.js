import {MockService} from './mock-service';

class DataModel {
  loadData() {
    return new MockService(12, 6);
  }
}

export {DataModel};
