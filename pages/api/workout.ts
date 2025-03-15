import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Workout from "@/models/Workout"; // Create a Workout model similar to User and WorkoutSchedule

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await dbConnect();
    const { type, duration, caloriesBurned } = req.body;

    try {
      const workout = new Workout({ type, duration, caloriesBurned });
      await workout.save();
      return res.status(201).json(workout);
    } catch (error) {
      console.error("Error saving workout:", error);
      return res.status(500).json({ message: "Error saving workout" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 