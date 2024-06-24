// uploadOnMemory.ts

import multer from "multer";

// Mendefinisikan cara menyimpan file di dalam memory
const storage = multer.memoryStorage();

// Membuat middleware upload
const upload = multer({ storage: storage });

export default upload;
