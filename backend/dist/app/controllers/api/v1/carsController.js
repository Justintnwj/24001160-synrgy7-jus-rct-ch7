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
const carsService_1 = __importDefault(require("../../../services/carsService"));
exports.default = {
    listTrue: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cars = yield carsService_1.default.listTrue();
            res.status(200).json(cars);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Gagal mendapatkan daftar mobil." });
        }
    }),
    list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const role = req.body.user.role;
        if (role == "superadmin" || role == "admin") {
            const cars = yield carsService_1.default.list();
            res.status(200).json(cars);
            return;
        }
        res.status(500).json({ message: "Gagal mendapatkan daftar mobil." });
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const name = req.body.name;
        const user = req.body.user;
        if (user.role == "superadmin" || user.role == "admin") {
            const carName = yield carsService_1.default.findOne(name);
            if (!carName) {
                const car = yield carsService_1.default.create(Object.assign(Object.assign({}, req.body), { createBy: user.email }));
                res.status(201).json({ message: "Mobil berhasil diinput" });
                return;
            }
            else {
                res.status(402).json({ message: "Nama Mobil Sudah Ada" });
                return;
            }
        }
        res.status(404).json({ message: "Kamu Bukan Admin" });
        return;
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const name = req.params.name;
        const bodyName = req.body.name;
        const user = req.body.user;
        console.log(user.role);
        if (user.role == "superadmin" || user.role == "admin") {
            const updateData = Object.assign(Object.assign({}, req.body), { updateBy: user.email });
            yield carsService_1.default.update(req.params.name, updateData);
            res.status(201).json({
                status: "Data berhasil diupdate",
            });
            return;
        }
        res.status(404).json({ message: "Data tidak berhasil diupdate." });
        return;
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const car = yield carsService_1.default.get(Number(req.params.id));
            res.status(201).json({
                status: "OK",
                data: car,
            });
        }
        catch (err) {
            res.status(404).json({ message: err });
        }
    }),
    destroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body.user;
        const name = req.params.name;
        console.log(user.role);
        if (user.role == "superadmin" || user.role == "admin") {
            yield carsService_1.default.delete(req.params.name);
            res.status(202).json({
                status: "Data berhasil dihapus",
            });
            return;
        }
        res.status(402).json({ message: "Data tidak berhasil dihapus" });
        return;
    }),
};
