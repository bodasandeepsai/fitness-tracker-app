import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: string;
  notes?: string;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
  type: string;
  duration: string;
}

interface WorkoutPlan {
  days: WorkoutDay[];
  intensity: string;
  frequency: number;
  notes: string[];
}

interface WorkoutPlanComponentProps {
  userMetrics: {
    weight: number;
    height: number;
    age: number;
    activityLevel: string;
    goals: string[];
  };
}

export default function WorkoutPlanComponent({ userMetrics }: WorkoutPlanComponentProps) {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    generateWorkoutPlan();
  }, [userMetrics]);

  const generateWorkoutPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const bmi = userMetrics.weight / Math.pow(userMetrics.height / 100, 2);
      const response = await fetch("/api/generateWorkoutPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bmi,
          activityLevel: userMetrics.activityLevel,
          goals: userMetrics.goals,
          age: userMetrics.age,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.message || "Failed to generate workout plan";
        if (data.error?.includes("API_KEY_INVALID")) {
          errorMessage = "API configuration error. Please contact support.";
        }
        throw new Error(errorMessage);
      }

      setWorkoutPlan(data);
      toast({
        title: "Success",
        description: "Your workout plan has been generated!",
      });
    } catch (error) {
      console.error("Error generating workout plan:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate workout plan";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Personalized Workout Plan</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-8">
            <p className="text-destructive">{error}</p>
            <button
              onClick={generateWorkoutPlan}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        ) : workoutPlan ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Intensity Level</p>
                <p className="text-lg">{workoutPlan.intensity}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Weekly Frequency</p>
                <p className="text-lg">{workoutPlan.frequency} days/week</p>
              </div>
            </div>
            
            <ScrollArea className="h-[500px] w-full rounded-md border">
              <div className="p-4">
                <Accordion type="single" collapsible>
                  {workoutPlan.days.map((day, index) => (
                    <AccordionItem key={index} value={`day-${index}`}>
                      <AccordionTrigger asChild>
                        <button className="flex justify-between w-full px-4 py-2">
                          <span>{day.day}</span>
                          <span className="text-sm text-muted-foreground">{day.type}</span>
                        </button>
                      </AccordionTrigger>
                      <AccordionContent asChild>
                        <div className="space-y-4 px-4 py-2">
                          <p className="text-sm text-muted-foreground">
                            Duration: {day.duration}
                          </p>
                          <div className="space-y-2">
                            {day.exercises.map((exercise, exIndex) => (
                              <div key={exIndex} className="border rounded-lg p-3">
                                <p className="font-medium">{exercise.name}</p>
                                <div className="text-sm text-muted-foreground">
                                  <p>Sets: {exercise.sets} × Reps: {exercise.reps}</p>
                                  <p>Rest: {exercise.rest}</p>
                                  {exercise.notes && <p className="mt-1">{exercise.notes}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {workoutPlan.notes.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Additional Notes</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {workoutPlan.notes.map((note, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">
              Generating your personalized workout plan...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 