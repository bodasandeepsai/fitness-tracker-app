"use client";

import { useState } from "react";
import UserMetricsForm from "../components/UserMetricsForm";
import WorkoutPlanComponent from "./WorkoutPlanComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserMetrics {
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  goals: string[];
}

export default function WorkoutsPage() {
  const [userMetrics, setUserMetrics] = useState<UserMetrics | null>(null);

  const handleMetricsSubmit = (data: UserMetrics) => {
    setUserMetrics(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Workout Plan</h2>
        <p className="text-muted-foreground">
          Get your personalized workout routine based on your metrics and goals.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Metrics</CardTitle>
            <CardDescription>Enter your details to generate a personalized workout plan</CardDescription>
          </CardHeader>
          <CardContent>
            <UserMetricsForm onSubmit={handleMetricsSubmit} />
          </CardContent>
        </Card>

        {userMetrics && (
          <WorkoutPlanComponent userMetrics={userMetrics} />
        )}
      </div>
    </div>
  );
}