import {MockService} from "./mock-service";

const mockData = new MockService();

class DataModel {
  loadData() {
    return new MockService(10, 6);
  }
}

export {DataModel};
