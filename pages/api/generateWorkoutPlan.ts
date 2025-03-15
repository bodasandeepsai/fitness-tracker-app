import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { bmi, activityLevel, goals } = req.body;

  try {
    // Call Gemini AI API to generate workout plan
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Generate a workout plan for someone with a BMI of ${bmi}, activity level of ${activityLevel}, and goals of ${goals}.`,
            },
          ],
        }),
      });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error generating workout plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}