import express from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const allowedExt = ["jpeg", "jpg", "png", "gif", "bmp"];
const maxImgSize = 4; // in Mb

export const saveUploadedImg = false;

let storage;
if (saveUploadedImg) {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
  });
} else {
  storage = multer.memoryStorage();
}

export const upload = multer({
  storage: storage, // use diskStorage configuration
  limits: {
    fileSize: maxImgSize * 1024 * 1024,
  },
  fileFilter: function (
    req: express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    const filetypes = new RegExp(allowedExt.join("|"), "i");
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error(`Only ${allowedExt.join(", ")} format allowed!`));
  },
});
