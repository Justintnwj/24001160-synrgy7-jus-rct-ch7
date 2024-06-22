"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = __importDefault(require("../v1/authController"));
const carsController_1 = __importDefault(require("../v1/carsController"));
const listorderController_1 = __importDefault(require("./listorderController"));
exports.default = { authController: authController_1.default, carsController: carsController_1.default, listorderController: listorderController_1.default };
