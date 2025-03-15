"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, ThumbsUp, Share2, UserPlus, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const posts = [
  {
    user: {
      name: "Sarah Johnson",
      image: "/avatars/sarah.jpg",
      role: "Fitness Enthusiast",
    },
    content: "Just completed my first 5K run! 🏃‍♀️ Thanks to everyone in the community for the motivation!",
    likes: 24,
    comments: 8,
    timeAgo: "2 hours ago",
  },
  {
    user: {
      name: "Mike Chen",
      image: "/avatars/mike.jpg",
      role: "Personal Trainer",
    },
    content: "Quick tip: Remember to stay hydrated during your workouts! Aim for at least 500ml of water per hour of exercise. 💧",
    likes: 45,
    comments: 12,
    timeAgo: "5 hours ago",
  },
  {
    user: {
      name: "Emma Wilson",
      image: "/avatars/emma.jpg",
      role: "Yoga Instructor",
    },
    content: "Join me for a live yoga session tomorrow at 8 AM EST! Perfect for beginners and intermediate practitioners. 🧘‍♀️",
    likes: 67,
    comments: 15,
    timeAgo: "1 day ago",
  },
];

const topMembers = [
  {
    name: "David Kim",
    image: "/avatars/david.jpg",
    points: 1250,
    badge: "Elite",
  },
  {
    name: "Lisa Chen",
    image: "/avatars/lisa.jpg",
    points: 980,
    badge: "Pro",
  },
  {
    name: "John Smith",
    image: "/avatars/john.jpg",
    points: 840,
    badge: "Pro",
  },
];

export default function CommunityPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Community</h1>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.user.image} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{post.user.name}</CardTitle>
                    <CardDescription>{post.user.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <span>{post.timeAgo}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Total Members</span>
                  </div>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>Active Discussions</span>
                  </div>
                  <span className="font-semibold">56</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={member.image} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.badge}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{member.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Find Friends
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 