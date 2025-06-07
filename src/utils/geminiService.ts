
const GEMINI_API_KEY = "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface PredictionResult {
  outcome: string;
  probability: number;
  type: "favorable" | "unfavorable" | "neutral";
  reasoning: string[];
  confidence: string;
}

export const analyzeCaseWithGemini = async (caseDetails: string): Promise<PredictionResult> => {
  const prompt = `
You are an expert legal AI assistant. Analyze the following legal case and provide a prediction about the likely outcome. 

Case Details: ${caseDetails}

Please provide your analysis in the following JSON format:
{
  "outcome": "One of: 'Judgment in favor of the Plaintiff', 'Not in favor of the Plaintiff', or 'Case will be Dismissed'",
  "probability": "A number between 60-95 representing confidence percentage",
  "type": "One of: 'favorable', 'unfavorable', or 'neutral'",
  "reasoning": ["Array of 3-4 key legal reasoning points"],
  "confidence": "Brief explanation of confidence level"
}

Consider legal precedents, evidence strength, procedural requirements, and applicable laws. Be thorough but concise in your reasoning.
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response");
    }

    const result = JSON.parse(jsonMatch[0]);
    
    // Validate and format the result
    return {
      outcome: result.outcome || "Case outcome uncertain",
      probability: Math.min(Math.max(result.probability || 75, 60), 95),
      type: result.type || "neutral",
      reasoning: Array.isArray(result.reasoning) ? result.reasoning : ["Analysis provided by AI"],
      confidence: result.confidence || "Moderate confidence based on available information"
    };

  } catch (error) {
    console.error("Error calling AI API:", error);
    
    // Fallback prediction if API fails
    return {
      outcome: "Case analysis temporarily unavailable",
      probability: 75,
      type: "neutral",
      reasoning: [
        "Unable to connect to AI analysis service",
        "Please try again later",
        "Manual legal consultation recommended"
      ],
      confidence: "AI service temporarily unavailable"
    };
  }
};
