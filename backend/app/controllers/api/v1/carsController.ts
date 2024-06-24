import { Request, Response } from "express";
import carsService from "../../../services/carsService";
import uploadOnMemory from "../../../cloudinary/uploadOnMemory";
import cloudinary from "../../../cloudinary/cloudinary";

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
    
      const carName = await carsService.findOne(name);
      if (!carName) {
        try {
          const createData = {
            name: req.body.name,
            availability: true,
            price: req.body.price,
            category: req.body.category,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            createBy: user.email,
            updateBy: user.email,
          };
    
          await carsService.create(createData);
    
          res.status(201).json({ message: "Mobil berhasil diinput" });
    
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
          res.status(400).json({
            message: "Failed to upload file!",
          });
        };
      } else {
        res.status(402).json({ message: "Nama Mobil Sudah Ada" });
        return;
      }
    
    
  },

  updateImage: async (req: Request, res: Response) => {
    try {
      uploadOnMemory.single("image")(req, res, async (err: any) => {
        if (err) {
          console.log(err);
          
          return res.status(400).json({
            message: "Failed to upload file!",
          });
        }
    
        // Pastikan req.file tidak undefined sebelum digunakan
        if (!req.file) {
          return res.status(400).json({
            message: "No file uploaded!",
          });
        }
    
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    
        const result = await cloudinary.uploader.upload(file);
    
        if (result && result.secure_url) {
          const updateData = {
            image: result.secure_url,
          };
    
          // Simpan data gambar ke database
          await carsService.updateImage(req.params.name, updateData);
    
          // Berikan respons JSON berhasil
          res.status(201).json({
            message: "Update image successfully",
            url: result.secure_url,
          });
        } else {
          res.status(400).json({
            message: "Failed to get image URL from Cloudinary!",
          });
        }
      });
    } catch (error) {
      console.error("Error updating image:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
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
