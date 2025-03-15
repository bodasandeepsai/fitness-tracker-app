"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  BarChart2,
  Calendar,
  Home,
  Pizza,
  Settings,
  Trophy,
  Users,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Workouts",
    icon: Activity,
    href: "/dashboard/workouts",
  },
  {
    label: "Nutrition",
    icon: Pizza,
    href: "/dashboard/nutrition",
  },
  {
    label: "Progress",
    icon: BarChart2,
    href: "/dashboard/progress",
  },
  {
    label: "Schedule",
    icon: Calendar,
    href: "/dashboard/schedule",
  },
  {
    label: "Challenges",
    icon: Trophy,
    href: "/dashboard/challenges",
  },
  {
    label: "Community",
    icon: Users,
    href: "/dashboard/community",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted/50">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}