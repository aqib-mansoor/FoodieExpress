import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const searchGrounding = async (query: string) => {
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Search grounding will be disabled.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is searching for "${query}" on a delivery app called Foodie Express. 
      Foodie Express delivers Food, Groceries, Electronics, and Bakery items.
      Based on this query, provide a list of relevant categories, keywords, or specific items the user might be looking for.
      Also, if there are any recent trends or popular items related to this query, include them.
      Format the response as a JSON object with the following structure:
      {
        "suggestedCategories": ["Category1", "Category2"],
        "refinedKeywords": ["keyword1", "keyword2"],
        "intent": "Brief description of user intent",
        "externalInsights": "Any relevant info from the web about this search"
      }`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error in search grounding:", error);
    return null;
  }
};
