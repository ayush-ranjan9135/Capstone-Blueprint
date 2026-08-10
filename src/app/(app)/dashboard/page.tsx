'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { useProjectStore } from '@/stores/projectStore';
import { useAuthStore } from '@/stores/authStore';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { MyTasksList } from '@/components/dashboard/MyTasksList';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import dynamic from 'next/dynamic';

const TaskCharts = dynamic(() => import('@/components/dashboard/TaskCharts').then(mod => mod.TaskCharts), { ssr: false });

export default function DashboardPage() {
  const { fetchTasks, isLoading: isTasksLoading } = useTaskStore();
  const { fetchProjects, isLoading: isProjectsLoading } = useProjectStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, [fetchTasks, fetchProjects]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const isLoading = isTasksLoading || isProjectsLoading;

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-primary tracking-tight pb-1">
          {greeting}, {user?.displayName?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-sm mt-1 text-secondary font-medium">
          Here&apos;s what&apos;s happening in your workspace today.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => <div key={i} className="h-32 bg-base/50 animate-pulse rounded-2xl border border-border-subtle" />)}
          </div>
          <div className="h-80 bg-base/50 animate-pulse rounded-2xl border border-border-subtle" />
        </div>
      ) : (
        <>
          <StatsGrid />
          <TaskCharts />
        </>
      )}

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RecentProjects />
          <MyTasksList />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
