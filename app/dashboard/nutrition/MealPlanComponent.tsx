import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MealPlan {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealPlanComponentProps {
  userMetrics: {
    weight: number;
    height: number;
    age: number;
    activityLevel: string;
    goals: string[];
  };
}

export default function MealPlanComponent({ userMetrics }: MealPlanComponentProps) {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    generateMealPlan();
  }, [userMetrics]);

  const generateMealPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const bmi = userMetrics.weight / Math.pow(userMetrics.height / 100, 2);
      const response = await fetch("/api/generateMealPlan", {
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
        let errorMessage = data.message || "Failed to generate meal plan";
        if (data.error?.includes("API_KEY_INVALID")) {
          errorMessage = "API configuration error. Please contact support.";
        }
        throw new Error(errorMessage);
      }

      setMealPlan(data);
      toast({
        title: "Success",
        description: "Your meal plan has been generated!",
      });
    } catch (error) {
      console.error("Error generating meal plan:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate meal plan";
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
        <CardTitle>Your Personalized Meal Plan</CardTitle>
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
              onClick={generateMealPlan}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        ) : mealPlan ? (
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Daily Calories</p>
                    <p className="text-2xl font-bold">{mealPlan.calories} kcal</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Macros</p>
                    <div className="space-y-1">
                      <p>Protein: {mealPlan.protein}g</p>
                      <p>Carbs: {mealPlan.carbs}g</p>
                      <p>Fats: {mealPlan.fats}g</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="breakfast">
                <ul className="list-disc pl-6 space-y-2">
                  {mealPlan.breakfast.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="lunch">
                <ul className="list-disc pl-6 space-y-2">
                  {mealPlan.lunch.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="dinner">
                <ul className="list-disc pl-6 space-y-2">
                  {mealPlan.dinner.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">
              Generating your personalized meal plan...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 