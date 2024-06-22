import { Request, Response } from "express";
import listorderService from "../../../services/listorderService";

export default {

  list: async (req: Request, res: Response) => {
    const role = req.body.user.role;

    if (role == "superadmin" || role == "admin" || role == "user") {
      const cars = await listorderService.list();
      res.status(200).json(cars);
      return;
    }
    res.status(500).json({ message: "Gagal mendapatkan daftar list order." });
  }
};
