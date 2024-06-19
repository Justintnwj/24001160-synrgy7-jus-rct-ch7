"use strict";
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
const User = sequelize.define("User", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    encryptedPassword: {
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
    role: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "user",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = User;
