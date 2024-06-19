import { Request, Response } from "express";
import carsService from "../../../services/carsService";

export default {
  listTrue: async (req: Request, res: Response) => {
    try {
      const cars = await carsService.listTrue();
      res.status(200).json(cars);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal mendapatkan daftar mobil." });
    }
  },

  list: async (req: Request, res: Response) => {
    const role = req.body.user.role;

    if (role == "superadmin" || role == "admin") {
      const cars = await carsService.list();
      res.status(200).json(cars);
      return;
    }
    res.status(500).json({ message: "Gagal mendapatkan daftar mobil." });
  },

  create: async (req: Request, res: Response) => {
    const name = req.body.name;
    const user = req.body.user;

    if (user.role == "superadmin" || user.role == "admin") {
      const carName = await carsService.findOne(name);
      if (!carName) {
        const car = await carsService.create({
          ...req.body,
          createBy: user.email,
        });
        res.status(201).json({ message: "Mobil berhasil diinput" });
        return;
      } else {
        res.status(402).json({ message: "Nama Mobil Sudah Ada" });
        return;
      }
    }
    res.status(404).json({ message: "Kamu Bukan Admin" });
    return;
  },

  update: async (req: Request, res: Response) => {
    const name = req.params.name;
    const bodyName = req.body.name;

    const user = req.body.user;

    console.log(user.role);
    if (user.role == "superadmin" || user.role == "admin") {
      const updateData = { ...req.body, updateBy: user.email };
      await carsService.update(req.params.name, updateData);
      res.status(201).json({
        status: "Data berhasil diupdate",
      });
      return;
    }
    res.status(404).json({ message: "Data tidak berhasil diupdate." });
    return;
  },

  show: async (req: Request, res: Response) => {
    try {
      const car = await carsService.get(Number(req.params.id));
      res.status(201).json({
        status: "OK",
        data: car,
      });
    } catch (err) {
      res.status(404).json({ message: err });
    }
  },

  destroy: async (req: Request, res: Response) => {
    const user = req.body.user;
    const name = req.params.name;

    console.log(user.role);
    if (user.role == "superadmin" || user.role == "admin") {
      await carsService.delete(req.params.name);
      res.status(202).json({
        status: "Data berhasil dihapus",
      });
      return;
    }
    res.status(402).json({ message: "Data tidak berhasil dihapus" });
    return;
  },
};
