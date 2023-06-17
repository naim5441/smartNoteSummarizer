# Note Taker Summary

## Overview

Note Taker Summary is a web application that summarizes the content of an uploaded image. It uses Optical Character Recognition (OCR) and Natural Language Processing (NLP) techniques to analyze and summarize the content of the document.

## Features

- Upload an image file containing text
- Extracts text from the image using OCR
- Summarizes the extracted text using OpenAI's GPT-3
- Displays the summary and provides an option to download the summary

## Tech Stack

- **Node.js** and **Express**: For creating the server-side application.
- **TypeScript**: A statically typed superset of JavaScript that adds types, making the codebase more robust.
- **OpenAI GPT-3**: For generating the summaries of the text extracted from the images.
- **Azure Cognitive Services**: For OCR capabilities to extract text from images.
- **jQuery**: Used for client-side scripting to manage the dynamic content display and AJAX requests.

## Setup & Running the App

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Create .env in the root folder and add the following lines, replacing YourValue with your actual values.
   - MICROSOFT_COMPUTER_VISION_SUBSCRIPTION_KEY=YourValue
   - MICROSOFT_COMPUTER_VISION_ENDPOINT=YourValue
   - OPEN_AI_ORGANIZATION_ID=YourValue
   - OPEN_AI_API_KEY=YourValue
4. Run the application in development mode with `npm run dev`.
5. For production, first compile the application with `npm run build`, then start the application with `npm start`.

### Note

To use the application, you will need API keys for both the OCR service and OpenAI's GPT-3 service.

## Code Structure

- Follows the MVC architecture
- Server-side logic in controllers and routes
- Client-side logic handled with jQuery

## Improvement Points

The application is a basic proof-of-concept and has room for several improvements:

- Error handling can be improved and made more user-friendly.
- The UI/UX could be made more appealing.
- Support could be added for more file types and larger files.
- The summarization could be refined with more advanced techniques or custom training.
