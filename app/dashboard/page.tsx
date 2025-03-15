"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Heart, Brain, Dumbbell, Timer, Flame } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import UserMetricsForm from "./components/UserMetricsForm";
import MealPlanComponent from "./nutrition/MealPlanComponent";
import WorkoutPlanComponent from "./workouts/WorkoutPlanComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const activityData = [
  { date: '2024-01', calories: 2200, steps: 8000 },
  { date: '2024-02', calories: 2400, steps: 10000 },
  { date: '2024-03', calories: 2100, steps: 7500 },
  { date: '2024-04', calories: 2600, steps: 12000 },
];

const workoutData = [
  { name: 'Mon', duration: 45 },
  { name: 'Tue', duration: 30 },
  { name: 'Wed', duration: 60 },
  { name: 'Thu', duration: 45 },
  { name: 'Fri', duration: 50 },
  { name: 'Sat', duration: 0 },
  { name: 'Sun', duration: 30 },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [userMetrics, setUserMetrics] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMetricsSubmit = (data) => {
    setUserMetrics(data);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+20.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workout Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">Today's session</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Days</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/7</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-muted-foreground">Resting</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your daily activity metrics</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="calories" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="steps" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Weekly Workouts</CardTitle>
            <CardDescription>Time spent exercising</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="duration" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fitness Plan Generator</CardTitle>
            <CardDescription>Enter your metrics to generate personalized plans</CardDescription>
          </CardHeader>
          <CardContent>
            <UserMetricsForm onSubmit={handleMetricsSubmit} />
          </CardContent>
        </Card>

        {userMetrics && (
          <Tabs defaultValue="meal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="meal">Meal Plan</TabsTrigger>
              <TabsTrigger value="workout">Workout Plan</TabsTrigger>
            </TabsList>
            <TabsContent value="meal">
              <MealPlanComponent userMetrics={userMetrics} />
            </TabsContent>
            <TabsContent value="workout">
              <WorkoutPlanComponent userMetrics={userMetrics} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}