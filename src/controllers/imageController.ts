import { Request, Response } from "express";
import { openApi } from "../services/openAIService";
import { ocrComputerVision } from "../services/visionService";

const HOST = process.env.NGROK_URL;

if (!process.env.MICROSOFT_COMPUTER_VISION_ENDPOINT) {
  throw new Error("MICROSOFT_COMPUTER_VISION_ENDPOINT is not set");
}

export const processImage = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send("You must upload the image before proceeding");
    return;
  }
  const fileName = req.file.filename;
  let imageUrl = `${HOST}/uploads/${fileName}`;
  if (!imageUrl) {
    res.status(500).send("Missing Image Url");
    return;
  }

  try {
    const image_text = await ocrComputerVision(imageUrl);
    const summarize_text = await openApi(image_text);
    //await saveNote("Note Title", summarize_text);
    res.json({ text: summarize_text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing the image");
  }
};
