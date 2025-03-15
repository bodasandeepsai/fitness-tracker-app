export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'trainer' | 'admin';
  profile: UserProfile;
}

export interface UserProfile {
  height: number;
  weight: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  fitnessGoals: string[];
  dietaryRestrictions: string[];
}

export interface WorkoutSession {
  id: string;
  userId: string;
  type: 'cardio' | 'strength' | 'yoga';
  duration: number;
  caloriesBurned: number;
  exercises: Exercise[];
  timestamp: Date;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
}

export interface NutritionLog {
  id: string;
  userId: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  date: Date;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Food[];
}

export interface Food {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: number;
}