"use client";
import { useEffect, useState } from 'react';

interface Meal {
  name: string;
  calories: number;
}

export default function Nutrition() {
  const [mealPlan, setMealPlan] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      const response = await fetch('/api/generateMealPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bmi: 22, activityLevel: 'moderate', goals: 'weight_loss' }),
      });
      const data = await response.json();
      console.log("API Response:", data);
      setMealPlan(data.mealPlan);
    };
  
    fetchMealPlan();
  }, []);

  return (
    <div>
      <h2>Meal Plan</h2>
      <ul>
        {mealPlan.map((meal, index) => (
          <li key={index}>
            {meal.name}: {meal.calories} calories
          </li>
        ))}
      </ul>
    </div>
  );
}