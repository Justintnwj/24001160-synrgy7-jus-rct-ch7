"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cars_1 = __importDefault(require("../models/cars")); // Pastikan mengganti "Cars" dengan model yang sesuai
exports.default = {
    create(createArgs) {
        return cars_1.default.create(createArgs);
    },
    updateImage(name, updateArgs) {
        return cars_1.default.update(updateArgs, {
            where: {
                name,
            },
        });
    },
    update(name, updateArgs) {
        return cars_1.default.update(updateArgs, {
            where: {
                name,
            },
        });
    },
    delete(name) {
        return cars_1.default.destroy({
            where: {
                name,
            },
        });
    },
    find(id) {
        return cars_1.default.findByPk(id);
    },
    findCarsTrue() {
        return cars_1.default.findAll({
            where: {
                availability: true,
            },
        });
    },
    findAll() {
        return cars_1.default.findAll();
    },
    findOne(name) {
        return cars_1.default.findOne({
            where: { name },
        });
    },
    getTotalCars() {
        return cars_1.default.count();
    },
};
