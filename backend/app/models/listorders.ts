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

interface ListordersAttributes {
  id: number;
  email: string;
  car: string;
  status: boolean;
  price: number;
  startrent: Date;
  finishrent: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CarsCreationAttributes extends Optional<ListordersAttributes, "id"> {}

interface CarsInstance
  extends Model<ListordersAttributes, CarsCreationAttributes>,
    ListordersAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Listorders = sequelize.define<CarsInstance>("listorders", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
  },
  car: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  startrent: {
    type: DataTypes.DATE,
  },
  finishrent: {
    type: DataTypes.DATE,
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

export default Listorders;
