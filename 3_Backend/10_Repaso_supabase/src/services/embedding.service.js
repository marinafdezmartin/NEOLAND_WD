import { GoogleGenAI } from "@google/genai";

// Esta función recibe un texto, se lo envía a Gemini y devuelve un array de 768 números
export async function embedding(text) {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Falta GOOGLE_API_KEY en .env");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const response = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  });

  return response.embeddings[0].values;
}
