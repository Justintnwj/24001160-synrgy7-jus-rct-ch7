import carsRepository from "../repositories/carsRepository";

type ReqCarsBodyType = {
  name: string;
  availability: boolean;
  price: number;
  category: string;
  start_date: Date;
  end_date: Date;
  createBy: string;
  updateBy: string;
};

type UpdateCarsBodyTypeImage = {
  image :string;
}

type UpdateCarsType = {
  availability: boolean;
  price: number;
  category: string;
  start_date: Date;
  end_date: Date;
};

export default {
  async create(requestBody: ReqCarsBodyType) {
    return carsRepository.create(requestBody);
  },

  async updateImage(name:string,requestBodyImage : UpdateCarsBodyTypeImage) {
    return carsRepository.updateImage(name,requestBodyImage);
  },

  async update(name: string, requestBody: UpdateCarsType) {
    return carsRepository.update(name, requestBody);
  },

  async delete(name: string) {
    return carsRepository.delete(name);
  },

  async listTrue() {
    try {
      const cars = await carsRepository.findCarsTrue();
      const carsCount = await carsRepository.getTotalCars();

      return {
        data: cars,
        count: carsCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async list() {
    try {
      const cars = await carsRepository.findAll();
      const carsCount = await carsRepository.getTotalCars();

      return {
        data: cars,
        count: carsCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async findOne(name: string) {
    return carsRepository.findOne(name);
  },

  get(id: number) {
    return carsRepository.find(id);
  },
};
