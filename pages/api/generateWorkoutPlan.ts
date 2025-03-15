import { NextApiRequest, NextApiResponse } from 'next';

interface WorkoutPlanRequest {
  bmi: number;
  activityLevel: string;
  goals: string[];
  age: number;
}

interface WorkoutPlan {
  days: {
    day: string;
    type: string;
    duration: string;
    exercises: {
      name: string;
      sets: number;
      reps: number;
      rest: string;
      notes?: string;
    }[];
  }[];
  intensity: string;
  frequency: number;
  notes: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { bmi, activityLevel, goals, age } = req.body as WorkoutPlanRequest;

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
    const prompt = `Generate a detailed workout plan for someone with the following characteristics:
      - BMI: ${bmi}
      - Activity Level: ${activityLevel}
      - Goals: ${goals.join(', ')}
      - Age: ${age}

      Please provide a structured workout plan with:
      - Weekly schedule (3-5 days depending on activity level and goals)
      - Each day should include:
        * Type of workout (strength, cardio, flexibility, etc.)
        * Duration
        * List of exercises with sets, reps, and rest periods
      - Overall intensity level
      - Weekly frequency
      - Important notes or precautions

      Format the response as a JSON object with the following structure:
      {
        "days": [
          {
            "day": "Monday",
            "type": "Strength Training",
            "duration": "45 minutes",
            "exercises": [
              {
                "name": "Exercise Name",
                "sets": 3,
                "reps": 12,
                "rest": "60 seconds",
                "notes": "Optional form tips"
              }
            ]
          }
        ],
        "intensity": "Moderate",
        "frequency": 3,
        "notes": ["Important note 1", "Important note 2"]
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
      throw new Error(error.error || 'Failed to generate workout plan');
    }

    const data = await response.json();
    console.log('Raw API Response:', JSON.stringify(data, null, 2));

    // Extract the workout plan from the response
    const workoutPlan: WorkoutPlan = JSON.parse(data.output.choices[0].text);

    res.status(200).json(workoutPlan);
  } catch (error) {
    console.error('Error generating workout plan:', error);
    res.status(500).json({ 
      message: 'Error generating workout plan',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}