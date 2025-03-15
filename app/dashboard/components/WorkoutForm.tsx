"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui/button"; // Adjust imports as necessary

export default function WorkoutForm({ onSubmit }) {
  const [type, setType] = useState("running");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type, duration: parseInt(duration) });
    setType("running");
    setDuration("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type">Workout Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="duration">Duration (minutes)</label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Log Workout</Button>
    </form>
  );
} 