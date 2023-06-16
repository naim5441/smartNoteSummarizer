import "dotenv/config";
import express from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { processImage } from "./controllers/imageController";

const app = express();
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  //  console.log(req);
  next();
});

app.use(express.static(path.join(__dirname, "../public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // dir to keep the image uploaded by user
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage, // use diskStorage configuration
  limits: {
    fileSize: 4 * 1024 * 1024, // limit file size to 5MB
  },
  fileFilter: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    var filetypes = /jpeg|jpg|png|gif|bmp/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error("Only .jpeg, .jpg and .png, .gif, .bmp format allowed!"));
  },
});
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.post("/upload", upload.single("image"), processImage);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
