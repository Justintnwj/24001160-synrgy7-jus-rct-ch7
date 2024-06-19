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
const Cars = sequelize.define("Cars", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    availability: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    createBy: {
        type: sequelize_1.DataTypes.STRING,
    },
    updateBy: {
        type: sequelize_1.DataTypes.STRING,
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
exports.default = Cars;
