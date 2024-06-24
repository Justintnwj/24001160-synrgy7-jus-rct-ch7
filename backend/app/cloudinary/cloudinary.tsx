// Import the Cloudinary library
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dk10jywdb", // Ganti dengan cloudname Anda
  api_key: "472928281362131", // Ganti dengan API Key Anda
  api_secret: "RHf8ZTwe7EHEHSkPDS90jtcTUsk", // Ganti dengan API Secret Anda
  secure: true,
});

export default cloudinary;
