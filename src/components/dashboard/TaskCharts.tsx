'use client';

import { useTaskStore } from '@/stores/taskStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { BarChart as BarChartIcon } from 'lucide-react';

const COLORS = ['#6366f1', '#38bdf8', '#22c55e', '#ef4444', '#f59e0b'];

export function TaskCharts() {
  const { tasks } = useTaskStore();

  // Status Distribution
  const statusData = [
    { name: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
    { name: 'In Progress', count: tasks.filter((t) => t.status === 'in-progress').length },
    { name: 'Review', count: tasks.filter((t) => t.status === 'in-review').length },
    { name: 'Done', count: tasks.filter((t) => t.status === 'done').length },
  ].filter(d => d.count > 0);

  // Priority Breakdown
  const priorityData = [
    { name: 'Low', value: tasks.filter((t) => t.priority === 'low').length },
    { name: 'Medium', value: tasks.filter((t) => t.priority === 'medium').length },
    { name: 'High', value: tasks.filter((t) => t.priority === 'high').length },
    { name: 'Critical', value: tasks.filter((t) => t.priority === 'critical').length },
  ].filter(d => d.value > 0);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 glass-panel text-center">
        <BarChartIcon className="w-8 h-8 text-muted mb-3 opacity-50" />
        <p className="text-sm font-medium text-secondary">No data available</p>
        <p className="text-xs text-muted mt-1">Create some tasks to see your charts</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div className="glass-panel p-5 animate-fade-up">
        <h3 className="text-sm font-semibold text-primary mb-6">Task Status Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#ffffff05' }} 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} 
              />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-sm font-semibold text-primary mb-6">Tasks by Priority</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
