import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AnalysisResult {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
  disclaimer: string;
}

export async function analyzeSkinImage(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  const prompt = `
    Analyze this image of a skin condition. 
    Provide a detailed analysis including:
    1. Potential condition name.
    2. Confidence level (0-1).
    3. A brief description of what you see.
    4. General recommendations (e.g., "Consult a dermatologist", "Keep the area clean").
    5. A strong medical disclaimer stating this is not a diagnosis.

    Return the result in JSON format with the following structure:
    {
      "condition": "string",
      "confidence": number,
      "description": "string",
      "recommendations": ["string"],
      "disclaimer": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64Image.split(",")[1] || base64Image,
                mimeType: mimeType,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
}
