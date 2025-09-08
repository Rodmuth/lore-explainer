
import { GoogleGenAI } from "@google/genai";
import { AI_BASE_PROMPT_TEMPLATE } from '../constants';

// IMPORTANT: This assumes the API key is set in the environment variables.
// Do not add any UI or code to handle API key input.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getAiResponse = async (loreContent: string, userQuestion: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: Gemini API key is not configured.";
  }

  try {
    const fullPrompt = AI_BASE_PROMPT_TEMPLATE
      .replace('{LORE_CONTENT}', loreContent)
      .replace('{USER_QUESTION}', userQuestion);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    // As per documentation, response.text is the direct way to get the output.
    return response.text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    if (error instanceof Error) {
        return `An error occurred while contacting the AI: ${error.message}`;
    }
    return "An unexpected error occurred while contacting the AI.";
  }
};
