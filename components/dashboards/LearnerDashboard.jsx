// components/dashboards/LearnerDashboard.jsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { CoursesCarousel } from "@/components/courses-carousel";
// or use the vertical version:
// import { VerticalCoursesCarousel } from "@/components/vertical-courses-carousel";

export function LearnerDashboard({ user }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">LearnSync - Learner Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Carousel Section */}
          <div className="mb-8">
            <CoursesCarousel />
            {/* or use the vertical version: */}
            {/* <VerticalCoursesCarousel /> */}
          </div>

          {/* Additional Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
              <p className="text-gray-600">Check your recent learning activities</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
              <p className="text-gray-600">View your scheduled sessions</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Achievements</h3>
              <p className="text-gray-600">Track your learning milestones</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}