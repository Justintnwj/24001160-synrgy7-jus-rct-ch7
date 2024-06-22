"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listorders_1 = __importDefault(require("../models/listorders"));
exports.default = {
    findAll() {
        return listorders_1.default.findAll();
    },
    getTotalCars() {
        return listorders_1.default.count();
    }
};
