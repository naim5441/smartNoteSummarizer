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
        Please perform the following tasks with the provided text: '${text}'.

        1. Generate a meaningful title that encapsulates the central theme.
        2. Identify the key elements or points and list them in bullet form.
        3. If the text from the image presents a question or a problem, provide a corresponding answer or solution.If not please skip and just proceed with the next step
        4. Compose a concise summary of the overall context.

        Ensure your response is formatted clearly with appropriate spacing. Please highlight any points of particular importance.
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
