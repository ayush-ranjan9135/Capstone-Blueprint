'use client';

import { useTaskStore } from '@/stores/taskStore';
import { CheckSquare, TrendingUp, AlertCircle } from 'lucide-react';

export function StatsGrid() {
  const { tasks } = useTaskStore();

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: CheckSquare,
      colorClass: 'text-white',
      bgClass: 'bg-brand/20 shadow-[0_0_12px_rgba(99,102,241,0.5)] border border-brand/30',
      trend: '+3 this week',
    },
    {
      label: 'In Progress',
      value: tasks.filter((t) => t.status === 'in-progress').length,
      icon: TrendingUp,
      colorClass: 'text-white',
      bgClass: 'bg-info/20 shadow-[0_0_12px_rgba(56,189,248,0.5)] border border-info/30',
      trend: 'Active tasks',
    },
    {
      label: 'Completed',
      value: tasks.filter((t) => t.status === 'done').length,
      icon: CheckSquare,
      colorClass: 'text-white',
      bgClass: 'bg-success/20 shadow-[0_0_12px_rgba(34,197,94,0.5)] border border-success/30',
      trend: 'This sprint',
    },
    {
      label: 'Overdue',
      value: tasks.filter((t) => {
        if (!t.dueDate || t.status === 'done') return false;
        return new Date(t.dueDate) < new Date();
      }).length,
      icon: AlertCircle,
      colorClass: 'text-white',
      bgClass: 'bg-error/20 shadow-[0_0_12px_rgba(239,68,68,0.5)] border border-error/30',
      trend: 'Needs attention',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i}
          className="glass-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group animate-fade-up"
          style={{ animationDelay: `${i * 0.05}s` }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-secondary">{stat.label}</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bgClass}`}>
              <stat.icon size={14} className={stat.colorClass} />
            </div>
          </div>
          <p className="text-3xl font-bold text-primary tracking-tight">{stat.value}</p>
          <p className="text-xs mt-1 text-muted font-medium">{stat.trend}</p>
        </div>
      ))}
    </div>
  );
}
