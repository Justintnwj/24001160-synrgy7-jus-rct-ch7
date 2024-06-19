"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
exports.default = {
    create(createArgs) {
        return user_1.default.create(createArgs);
    },
    update(id, updateArgs) {
        return user_1.default.update({ role: updateArgs.role }, {
            where: { id },
            fields: ["role"],
        });
    },
    delete(id) {
        return user_1.default.destroy({
            where: {
                id,
            },
        });
    },
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findByPk(id);
            return { email: user.email, role: user.role, name: user.name };
        });
    },
    findAll() {
        return user_1.default.findAll();
    },
    getTotalUser() {
        return user_1.default.count();
    },
    findOne(email) {
        return user_1.default.findOne({
            where: { email: email },
        });
    },
    findAdmin(role) {
        return user_1.default.findOne({
            where: { role: role },
        });
    },
};
