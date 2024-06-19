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
const userService_1 = __importDefault(require("../../../services/userService"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10;
function encryptPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedPassword = yield new Promise((resolve, reject) => {
            bcrypt.hash(password, SALT, (err, encPass) => {
                if (!!err) {
                    reject(err);
                    return;
                }
                resolve(encPass);
            });
        }).then((res) => {
            return res;
        });
        return encryptedPassword;
    });
}
function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
            if (!!err) {
                reject(err);
                return;
            }
            resolve(isPasswordCorrect);
        });
    });
}
function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}
exports.default = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const name = req.body.name;
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        // Periksa apakah email sudah terdaftar
        try {
            const existingUser = yield userService_1.default.findOne(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email sudah terdaftar." });
            }
        }
        catch (error) {
            console.error("Gagal memeriksa email:", error);
            return res
                .status(500)
                .json({ message: "Terjadi kesalahan saat memeriksa email." });
        }
        // Jika email belum terdaftar, lakukan proses registrasi
        try {
            const encryptedPassword = yield encryptPassword(password);
            const user = yield userService_1.default.create({ email, encryptedPassword, name });
            res.status(201).json({
                message: "Berhasil melakukan registrasi",
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        }
        catch (error) {
            console.error("Gagal melakukan registrasi:", error);
            res.status(500).json({ message: "Gagal melakukan registrasi." });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const user = yield userService_1.default.findOne(email);
        if (!user) {
            res.status(404).json({ message: "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital." });
            return;
        }
        const isPasswordCorrect = yield checkPassword(user.encryptedPassword, password);
        if (!isPasswordCorrect) {
            res.status(404).json({ message: "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital." });
            return;
        }
        const token = yield createToken({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role,
        });
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role,
        });
    }),
    authorize: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "Rahasia");
            req.body.user = yield userService_1.default.get(tokenPayload.id);
            next();
        }
        catch (err) {
            console.error(err);
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    }),
    whoami: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).json(req.body.user);
    }),
    list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const role = req.body.user.role;
        console.log(role);
        if (role == "superadmin" || role == "admin") {
            const users = yield userService_1.default.list();
            res.status(200).json(users);
            return;
        }
        res.status(500).json({ message: "Gagal mendapatkan daftar user." });
        return;
    }),
    destroy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const role = req.body.user.role;
        const bodyEmail = req.body.email;
        console.log(role);
        if (role == "superadmin") {
            const bodyEmailName = yield userService_1.default.findOne(bodyEmail);
            if (bodyEmailName) {
                yield userService_1.default.delete(req.params.id);
                res.status(202).json({
                    status: "Data berhasil dihapus",
                });
                return;
            }
            else {
                res.status(402).json({ message: "Email Tidak Ada" });
                return;
            }
        }
        res.status(404).json({ message: "Data tidak berhasil dihapus" });
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const role = req.body.user.role;
        const bodyEmail = req.body.email;
        console.log(role);
        if (role == "superadmin") {
            const bodyEmailName = yield userService_1.default.findOne(bodyEmail);
            if (bodyEmailName) {
                yield userService_1.default.update(req.params.id, req.body);
                res.status(201).json({
                    status: "Data berhasil diupdate",
                });
                return;
            }
            else {
                res.status(402).json({ message: "Email Tidak Ada" });
                return;
            }
        }
        res.status(404).json({ message: "Data tidak berhasil diupdate." });
    }),
};
