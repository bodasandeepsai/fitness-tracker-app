import { NextApiRequest, NextApiResponse } from 'next';

interface MealPlanRequest {
  bmi: number;
  activityLevel: string;
  goals: string[];
  age: number;
}

interface MealPlan {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { bmi, activityLevel, goals, age } = req.body as MealPlanRequest;

  // Validate required fields
  if (!bmi || !activityLevel || !goals || !age) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      required: ['bmi', 'activityLevel', 'goals', 'age']
    });
  }

  // Validate API key
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    console.error('Together API key is not configured');
    return res.status(500).json({ message: 'API configuration error' });
  }

  try {
    const prompt = `Generate a detailed meal plan for someone with the following characteristics:
      - BMI: ${bmi}
      - Activity Level: ${activityLevel}
      - Goals: ${goals.join(', ')}
      - Age: ${age}

      Please provide a structured meal plan with:
      - Breakfast options (3-4 items)
      - Lunch options (3-4 items)
      - Dinner options (3-4 items)
      - Healthy snacks (2-3 items)
      - Daily caloric target
      - Macronutrient breakdown (protein, carbs, fats in grams)

      Format the response as a JSON object with the following structure:
      {
        "breakfast": ["item1", "item2", ...],
        "lunch": ["item1", "item2", ...],
        "dinner": ["item1", "item2", ...],
        "snacks": ["item1", "item2", ...],
        "calories": number,
        "protein": number,
        "carbs": number,
        "fats": number
      }

      Ensure the response is valid JSON and matches this exact structure.`;

    const response = await fetch('https://api.together.xyz/inference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 40,
        repetition_penalty: 1.1,
        stop: ['</s>', '[/INST]'],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Together API error:', error);
      throw new Error(error.error || 'Failed to generate meal plan');
    }

    const data = await response.json();
    console.log('Raw API Response:', JSON.stringify(data, null, 2));
    
    try {
      // Parse the response text as JSON
      const mealPlan: MealPlan = JSON.parse(data.output.choices[0].text);
      res.status(200).json(mealPlan);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw AI response:', data);
      res.status(500).json({ 
        message: 'Error parsing AI response',
        error: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
      });
    }
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ 
      message: 'Error generating meal plan',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}