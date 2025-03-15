"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Scale, TrendingUp, Ruler } from "lucide-react";
import UserMetricsForm from "../components/UserMetricsForm";
import { useState } from "react";

export default function ProgressPage() {
  const [metrics, setMetrics] = useState({
    weight: 75,
    bodyFat: 18,
    muscleMass: 32,
  });

  const handleMetricsSubmit = (data) => {
    setMetrics(data);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Progress Tracking</h1>
      </div>

      <UserMetricsForm onSubmit={handleMetricsSubmit} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.weight} kg</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-4 w-4 text-green-500 mr-1" />
              +0.5 kg from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Body Fat %</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.bodyFat}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-4 w-4 text-green-500 mr-1" />
              -1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Muscle Mass</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.muscleMass} kg</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-4 w-4 text-green-500 mr-1" />
              +0.8 kg from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Measurements</CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Chest:</span>
                <span>42"</span>
              </div>
              <div className="flex justify-between">
                <span>Waist:</span>
                <span>32"</span>
              </div>
              <div className="flex justify-between">
                <span>Arms:</span>
                <span>14"</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 