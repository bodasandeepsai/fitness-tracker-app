// pages/api/generatePlan.js
import meals from '@/data/meals.json';
import workouts from '@/data/workouts.json';

export default function handler(req, res) {
  const { bmi, activityLevel, goals } = req.body;

  // Logic to generate plans based on user data
  const mealPlan = meals;
  const workoutPlan = workouts.filter(workout => workout.type === goals);

  res.status(200).json({ mealPlan, workoutPlan });
}