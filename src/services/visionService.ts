import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import axios from "axios";

const MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY =
  process.env.MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY;
const MICROSOFT_COMPUTER_VISION_ENDPOINT =
  process.env.MICROSOFT_COMPUTER_VISION_ENDPOINT || "";
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const HOST = process.env.NGROK_URL;

//const MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY = config.get<string>(
//  "microsoftVision.subscriptionKey"
//);
//const MICROSOFT_COMPUTER_VISION_ENDPOINT = config.get<string>(
//  "microsoftVision.endpoint"
//);
//const OPEN_AI_API_KEY = config.get<string>("openai.apiKey");

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({
    inHeader: {
      "Ocp-Apim-Subscription-Key": MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY,
    },
  }),
  MICROSOFT_COMPUTER_VISION_ENDPOINT
);

export const ocrComputerVision = async (imageUrl: string) => {
  try {
    // Fetch image and convert to base64
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");
    const base64Image = imageBuffer.toString("base64");
    const contentType = response.headers["content-type"];

    // Create binary data for the image and convert it to a buffer
    const binaryData = Buffer.from(base64Image, "base64");

    // Use the buffer as the parameter for recognizePrintedTextInStream
    const result = await computerVisionClient.recognizePrintedTextInStream(
      true,
      binaryData
    );

    const lines = result.regions?.flatMap((r) => r.lines);
    const words = lines?.flatMap((l: any) => l.words);
    const text = words?.map((w: any) => w.text).join(" ");

    if (!text) {
      throw new Error("No text found in the image.");
    }
    return text;
  } catch (error) {
    console.log("ERRROR", error);
    throw new Error("Error on computer vision call.");
  }
};
