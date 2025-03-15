"use client";
import { useEffect, useState } from 'react';

interface Workout {
  name: string;
  duration: number;
}

export default function Workouts() {
  const [workoutPlan, setWorkoutPlan] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await fetch('/api/generateWorkoutPlan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bmi: 22, activityLevel: 'moderate', goals: 'cardio' }),
        });
        const data = await response.json();
        console.log("API Response:", data); // Log the full API response
        setWorkoutPlan(data.workoutPlan);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
        setWorkoutPlan([]); // Set to empty array on error
      }
    };
  
    fetchWorkoutPlan();
  }, []);
  
  return (
    
      <div>
        <h2>Workout Plan</h2>
        {workoutPlan.length > 0 ? (
          <ul>
            {workoutPlan.map((workout, index) => (
              <li key={index}>
                {workout.name}: {workout.duration} minutes
              </li>
            ))}
          </ul>
        ) : (
          <p>No workout plan available.</p>
        )}
      </div>
    
  );
}