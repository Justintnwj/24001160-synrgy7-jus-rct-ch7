import { NextFunction, Request, Response } from "express";
import userService from "../../../services/userService";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10;

async function encryptPassword(password: string) {
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encPass) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(encPass);
    });
  }).then((res: string) => {
    return res;
  });
  return encryptedPassword;
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

type User = {};

export default {
  register: async (req, res) => {
    const name: string = req.body.name;
    const email: string = req.body.email.toLowerCase();
    const password: string = req.body.password;

    // Periksa apakah email sudah terdaftar
    try {
      const existingUser = await userService.findOne(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar." });
      }
    } catch (error) {
      console.error("Gagal memeriksa email:", error);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan saat memeriksa email." });
    }

    // Jika email belum terdaftar, lakukan proses registrasi
    try {
      const encryptedPassword = await encryptPassword(password);
      const user = await userService.create({ email, encryptedPassword , name});
      res.status(201).json({
        message: "Berhasil melakukan registrasi",
        id: user.id,
        email: user.email,
        name : user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error("Gagal melakukan registrasi:", error);
      res.status(500).json({ message: "Gagal melakukan registrasi." });
    }
  },

  login: async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await userService.findOne(email);

    if (!user) {
      res.status(404).json({ message: "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital." });
      return;
    }
    const isPasswordCorrect = await checkPassword(
      user.encryptedPassword,
      password
    );
    if (!isPasswordCorrect) {
      res.status(404).json({ message: "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital." });
      return;
    }

    const token = await createToken({
      id: user.id,
      name : user.name,
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
  },

  authorize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      req.body.user = await userService.get(tokenPayload.id);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },

  whoami: async (req: Request, res: Response) => {
    res.status(200).json(req.body.user);
  },

  list: async (req: Request, res: Response) => {
    const role = req.body.user.role;
    console.log(role);
    if (role == "superadmin" || role == "admin") {
      const users = await userService.list();
      res.status(200).json(users);
      return;
    }
    res.status(500).json({ message: "Gagal mendapatkan daftar user." });
    return;
  },

  destroy: async (req: Request, res: Response) => {
    const role = req.body.user.role;
    const bodyEmail = req.body.email;

    console.log(role);
    if (role == "superadmin") {
      const bodyEmailName = await userService.findOne(bodyEmail);
      if (bodyEmailName) {
        await userService.delete(req.params.id);
        res.status(202).json({
          status: "Data berhasil dihapus",
        });
        return;
      } else {
        res.status(402).json({ message: "Email Tidak Ada" });
        return;
      }
    }
    res.status(404).json({ message: "Data tidak berhasil dihapus" });
  },

  update: async (req: Request, res: Response) => {
    const role = req.body.user.role;
    const bodyEmail = req.body.email;
    console.log(role);
    if (role == "superadmin") {
      const bodyEmailName = await userService.findOne(bodyEmail);
      if (bodyEmailName) {
        await userService.update(req.params.id, req.body);
        res.status(201).json({
          status: "Data berhasil diupdate",
        });
        return;
      } else {
        res.status(402).json({ message: "Email Tidak Ada" });
        return;
      }
    }
    res.status(404).json({ message: "Data tidak berhasil diupdate." });
  },
};
