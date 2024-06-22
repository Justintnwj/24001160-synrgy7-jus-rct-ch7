import Listorders from "../models/listorders"; 


export default {

  findAll() {
    return Listorders.findAll();
  },

  getTotalCars() {
    return Listorders.count();
  }
};
