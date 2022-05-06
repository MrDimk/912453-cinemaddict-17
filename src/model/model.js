import {MockService} from './mock-service';


class DataModel {
  loadData() {
    return new MockService(10, 6);
  }
}

export {DataModel};
