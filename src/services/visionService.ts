import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

const MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY =
  process.env.MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY;
const MICROSOFT_COMPUTER_VISION_ENDPOINT =
  process.env.MICROSOFT_COMPUTER_VISION_ENDPOINT || "";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({
    inHeader: {
      "Ocp-Apim-Subscription-Key": MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY,
    },
  }),
  MICROSOFT_COMPUTER_VISION_ENDPOINT
);

export const ocrComputerVision = async (base64Image: string) => {
  try {
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
