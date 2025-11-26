// components/vertical-courses-carousel.jsx
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconBook, IconChartBar, IconHelp } from "@tabler/icons-react";

export function CoursesCarousel() {
  const courses = [
    {
      id: 1,
      title: "My Courses",
      description: "Continue your learning journey",
      icon: IconBook,
      progress: 75,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Progress",
      description: "Track your learning progress",
      icon: IconChartBar,
      progress: 60,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Find Help",
      description: "Connect with helpers",
      icon: IconHelp,
      progress: 30,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Learning Dashboard</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[400px]">
          {courses.map((course, index) => (
            <CarouselItem key={course.id} className="pt-1 basis-1/2">
              <div className="p-1">
                <Card className="border-2 hover:border-blue-300 transition-all duration-300">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-40">
                    <div className={`${course.color} rounded-full p-3 mb-3`}>
                      <course.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {course.description}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className={`${course.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">
                      {course.progress}% Complete
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}