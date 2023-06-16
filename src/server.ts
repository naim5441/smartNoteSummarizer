import "dotenv/config";
import express from "express";
import { MulterError } from "multer";
import path from "path";
import { processImage } from "./controllers/imageController";
import { upload } from "./controllers/uploadController";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.post("/upload", function (req, res, next) {
  upload.single("image")(req, res, function (err) {
    if (err instanceof MulterError) {
      res.status(400).send({ error: err.message });
    } else if (err) {
      res.status(500).send({ error: err.message });
    } else {
      processImage(req, res);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
