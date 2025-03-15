// pages/api/recommendations.js
import { getRecommendation } from '@/lib/recommendationModel';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userData = req.body;
    const recommendation = await getRecommendation(userData);
    res.status(200).json({ recommendation });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}