import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORGANIZATION_ID,
  apiKey: process.env.OPEN_AI_API_KEY,
});

if (!configuration.apiKey) {
  throw new Error("OPEN_AI_API_KEY is not set");
}

const openai = new OpenAIApi(configuration);

export const openApi = async (text: string) => {
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("Invalid input text. Please provide a valid string.");
  }

  try {
    // Define the instructions for GPT-3
    const instructions = `
        Given the following text: ${text}, 
        please:
            1. Generate a title.
            2. Identify and bullet point the key elements.
            3. Summarize the context.
        Also, please use clear spacing and highlight any particularly important points.
        `;

    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: instructions,
      max_tokens: 300, // Increase the max tokens to accommodate the extra output
      temperature: 0.5, // Adjust the randomness of the output
    });

    // Additional checks for data availability
    if (
      gptResponse &&
      gptResponse.data &&
      gptResponse.data.choices &&
      gptResponse.data.choices[0]
    ) {
      console.log("######", gptResponse.data.choices[0].text);
      return gptResponse.data.choices[0].text; // extract the generated text
    } else {
      throw new Error("GPT-3 response is missing expected data.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error on OpenAI GPT-3 call.");
  }
};
