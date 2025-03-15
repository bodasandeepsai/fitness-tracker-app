// app/dashboard/plans.tsx
"use client";
import { useEffect, useState } from 'react';

export default function Plans() {
  const [mealPlan, setMealPlan] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch('/api/generatePlan', {
        method: 'POST',
        body: JSON.stringify({ bmi: 22, activityLevel: 'moderate', goals: 'cardio' }),
      });
      const data = await response.json();
      setMealPlan(data.mealPlan);
      setWorkoutPlan(data.workoutPlan);
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <h2>Meal Plan</h2>
      <pre>{JSON.stringify(mealPlan, null, 2)}</pre>

      <h2>Workout Plan</h2>
      <pre>{JSON.stringify(workoutPlan, null, 2)}</pre>
    </div>
  );
}