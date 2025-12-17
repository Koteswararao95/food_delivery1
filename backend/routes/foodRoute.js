import express from 'express';
import { addFood,listFood,removeFood} from '../controllers/foodController.js';
import multer from 'multer';

// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const router = express.Router();

// Ensure image directory exists
// const imagePath = path.join(__dirname, '../public/image');
// if (!fs.existsSync(imagePath)) {
//   fs.mkdirSync(imagePath, { recursive: true });
// }

// Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, imagePath),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
const storage = multer.diskStorage({
  destination:"public/image",
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
  }
})
const upload = multer({ storage });

// POST route to upload food with image
router.post('/add', upload.single('image'), addFood);
router.get("/list", listFood)
router.post('/remove',removeFood)


export default router;