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
const listorderService_1 = __importDefault(require("../../../services/listorderService"));
exports.default = {
    list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const role = req.body.user.role;
        if (role == "superadmin" || role == "admin" || role == "user") {
            const cars = yield listorderService_1.default.list();
            res.status(200).json(cars);
            return;
        }
        res.status(500).json({ message: "Gagal mendapatkan daftar list order." });
    })
};
