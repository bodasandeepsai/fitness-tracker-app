// app/dashboard/recommendations.tsx
"use client";
import { useEffect, useState } from 'react';

export default function Recommendations() {
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const fetchRecommendation = async () => {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        body: JSON.stringify({ steps: 8000, calories_burned: 300, workout_duration: 45 }),
      });
      const data = await response.json();
      setRecommendation(data.recommendation);
    };

    fetchRecommendation();
  }, []);

  return (
    <div>
      <h2>AI Recommendations</h2>
      <p>Your recommended workout intensity: {recommendation}</p>
    </div>
  );
}