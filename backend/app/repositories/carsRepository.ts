import { UpdatedAt } from "sequelize-typescript";
import Cars from "../models/cars"; // Pastikan mengganti "Cars" dengan model yang sesuai

type ReqCarsBodyType = {
  name: string;
  availability: boolean;
  price: number;
  category: string;
  start_date: Date;
  end_date: Date;
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
  create(createArgs: ReqCarsBodyType) {
    return Cars.create(createArgs);
  },

  updateImage(name:string, updateArgs : UpdateCarsBodyTypeImage) {
    return Cars.update(updateArgs, {
      where : {
        name,
      },
    });
  },

  update(name: string, updateArgs: UpdateCarsType) {
    return Cars.update(updateArgs, {
      where: {
        name,
      },
    });
  },

  delete(name: string) {
    return Cars.destroy({
      where: {
        name,
      },
    });
  },

  find(id: number) {
    return Cars.findByPk(id);
  },

  findCarsTrue() {
    return Cars.findAll({
      where: {
        availability: true,
      },
    });
  },

  findAll() {
    return Cars.findAll();
  },

  findOne(name: string) {
    return Cars.findOne({
      where: { name },
    });
  },

  getTotalCars() {
    return Cars.count();
  },
};
