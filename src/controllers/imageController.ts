import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { openApi } from "../services/openAIService";
import { ocrComputerVision } from "../services/visionService";
import { saveUploadedImg } from "./uploadController";

const HOST = process.env.NGROK_URL;

if (!process.env.MICROSOFT_COMPUTER_VISION_ENDPOINT) {
  throw new Error("MICROSOFT_COMPUTER_VISION_ENDPOINT is not set");
}

export const processImage = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send("You must upload the image before proceeding");
    return;
  }

  let imageData;

  if (saveUploadedImg) {
    const filePath = path.join(__dirname, "../../uploads", req.file.filename);
    imageData = fs.readFileSync(filePath).toString("base64");
  } else {
    // Image is in memory
    imageData = req.file.buffer.toString("base64");
  }

  if (!imageData) {
    res.status(500).send("Missing Image Data");
    return;
  }

  try {
    const image_text = await ocrComputerVision(imageData); // pass base64 string to ocrComputerVision
    const summarize_text = await openApi(image_text);
    //await saveNote("Note Title", summarize_text);
    res.json({ text: summarize_text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image");
  }
};
