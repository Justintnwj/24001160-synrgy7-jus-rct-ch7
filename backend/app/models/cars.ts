"use strict";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import config from "../../config/database";

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "postgres",
  }
);

interface CarsAttributes {
  id: number;
  name: string;
  availability: boolean;
  price: number;
  category: string;
  image: string;
  start_date: Date;
  end_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  createBy: string;
  updateBy: string;
}

interface CarsCreationAttributes extends Optional<CarsAttributes, "id"> {}

interface CarsInstance
  extends Model<CarsAttributes, CarsCreationAttributes>,
    CarsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Cars = sequelize.define<CarsInstance>("Cars", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  availability: {
    type: DataTypes.BOOLEAN,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  createBy: {
    type: DataTypes.STRING,
  },
  updateBy: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

export default Cars;
