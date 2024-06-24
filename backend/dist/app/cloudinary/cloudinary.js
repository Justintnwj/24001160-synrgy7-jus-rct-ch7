"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the Cloudinary library
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: "dk10jywdb", // Ganti dengan cloudname Anda
    api_key: "472928281362131", // Ganti dengan API Key Anda
    api_secret: "RHf8ZTwe7EHEHSkPDS90jtcTUsk", // Ganti dengan API Secret Anda
    secure: true,
});
exports.default = cloudinary_1.v2;
