"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Users, Star, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const challenges = [
  {
    title: "30-Day Fitness Challenge",
    description: "Complete daily workouts for 30 days straight",
    progress: 60,
    participants: 1234,
    daysLeft: 12,
    reward: "Gold Badge",
  },
  {
    title: "10K Steps Daily",
    description: "Walk 10,000 steps every day for a week",
    progress: 85,
    participants: 856,
    daysLeft: 2,
    reward: "Silver Badge",
  },
  {
    title: "Weight Loss Challenge",
    description: "Lose 5kg in 8 weeks safely and sustainably",
    progress: 40,
    participants: 567,
    daysLeft: 28,
    reward: "Platinum Badge",
  },
];

const achievements = [
  {
    title: "Early Bird",
    description: "Complete 5 morning workouts",
    icon: Clock,
    earned: true,
  },
  {
    title: "Strength Master",
    description: "Lift 100kg in any exercise",
    icon: TrendingUp,
    earned: true,
  },
  {
    title: "Social Butterfly",
    description: "Join 3 group workouts",
    icon: Users,
    earned: false,
  },
  {
    title: "Goal Crusher",
    description: "Complete all daily goals for a week",
    icon: Target,
    earned: false,
  },
];

export default function ChallengePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Challenges & Achievements</h1>
        <Button>
          <Trophy className="h-4 w-4 mr-2" />
          Join Challenge
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                {challenge.title}
              </CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={challenge.progress} />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{challenge.participants} joined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Reward: {challenge.reward}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => (
          <Card key={index} className={achievement.earned ? "bg-primary/5" : "opacity-50"}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <achievement.icon className="h-5 w-5 text-primary" />
                {achievement.earned && <Star className="h-4 w-4 text-yellow-500" />}
              </div>
              <CardTitle className="text-base">{achievement.title}</CardTitle>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
} 