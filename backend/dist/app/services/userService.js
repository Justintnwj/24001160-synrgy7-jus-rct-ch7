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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
exports.default = {
    create(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.create(requestBody);
        });
    },
    update(id, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.update(id, requestBody);
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.delete(id);
        });
    },
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository_1.default.findAll();
                const userCount = yield userRepository_1.default.getTotalUser();
                return {
                    data: users,
                    count: userCount,
                };
            }
            catch (err) {
                throw err;
            }
        });
    },
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.find(id);
            return user;
        });
    },
    findOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.findOne(email);
        });
    },
    findAdmin(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return userRepository_1.default.findOne(role);
        });
    },
};
