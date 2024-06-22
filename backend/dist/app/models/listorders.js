"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const sequelize = new sequelize_1.Sequelize(database_1.default.development.database, database_1.default.development.username, database_1.default.development.password, {
    host: database_1.default.development.host,
    dialect: "postgres",
});
const Listorders = sequelize.define("listorders", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    car: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    startrent: {
        type: sequelize_1.DataTypes.DATE,
    },
    finishrent: {
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
});
exports.default = Listorders;
