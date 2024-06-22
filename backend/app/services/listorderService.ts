import listorderRepository from "../repositories/listorderRepository";


export default {

  async list() {
    try {
      const cars = await listorderRepository.findAll();
      const carsCount = await listorderRepository.getTotalCars();

      return {
        data: cars,
        count: carsCount,
      };
    } catch (err) {
      throw err;
    }
  }
};
