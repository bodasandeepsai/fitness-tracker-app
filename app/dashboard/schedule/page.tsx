"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { AddWorkoutDialog } from "./components/AddWorkoutDialog";
import { useToast } from "@/hooks/use-toast";

interface Workout {
  time: string;
  type: string;
  duration: string;
}

interface DaySchedule {
  _id: string;
  userId: string;
  day: string;
  workouts: Workout[];
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<DaySchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSchedules = async () => {
    try {
      const response = await fetch("/api/schedule");
      if (!response.ok) {
        throw new Error("Failed to fetch schedules");
      }
      const data = await response.json();
      
      // Sort schedules by date (assuming the day is in a format that can be compared)
      const sortedSchedules = data.sort((a, b) => {
        const dateA = new Date(a.day);
        const dateB = new Date(b.day);
        return dateB.getTime() - dateA.getTime(); // Sort descending
      });

      // Create a map of existing schedules
      const schedulesMap = new Map(sortedSchedules.map((schedule: DaySchedule) => [schedule.day, schedule]));
      
      // Ensure we have an entry for each day
      const fullSchedule = days.map(day => {
        return schedulesMap.get(day) || {
          _id: `temp-${day}`,
          userId: '',
          day,
          workouts: [],
        } as DaySchedule;
      });

      setSchedules(fullSchedule);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load workout schedule",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return time; // Return original if parsing fails
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workout Schedule</h1>
        <AddWorkoutDialog onWorkoutAdded={fetchSchedules} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Your workout schedule for the month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Calendar Component (Coming Soon)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Your workout plan for this week</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                Loading schedule...
              </div>
            ) : (
              <div className="space-y-6">
                {schedules.map((schedule) => (
                  <div key={schedule.day} className="space-y-2">
                    <h3 className="font-semibold">{schedule.day}</h3>
                    {schedule.workouts && schedule.workouts.length > 0 ? (
                      schedule.workouts.map((workout, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{workout.type}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatTime(workout.time)}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {workout.duration}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                        No workouts scheduled
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 