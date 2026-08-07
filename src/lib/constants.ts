import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Bell,
  User,
  Settings,
} from 'lucide-react';

export const TASK_STATUS_CONFIG: Record<string, { label: string; dotClass: string; glowClass: string }> = {
  'backlog': { label: 'moved to Backlog', dotClass: 'bg-muted', glowClass: 'shadow-[0_0_8px_rgba(148,163,184,0.5)]' },
  'todo': { label: 'moved to To Do', dotClass: 'bg-info', glowClass: 'shadow-[0_0_8px_rgba(56,189,248,0.5)]' },
  'in-progress': { label: 'started work on', dotClass: 'bg-brand', glowClass: 'shadow-[0_0_8px_rgba(99,102,241,0.5)]' },
  'in-review': { label: 'submitted for review', dotClass: 'bg-warning', glowClass: 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' },
  'done': { label: 'completed', dotClass: 'bg-success', glowClass: 'shadow-[0_0_8px_rgba(34,197,94,0.5)]' },
};

export const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { href: '/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
];

export const BOTTOM_NAV_ITEMS = [
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export const AUTH_COOKIE_NAME = 'firebase-auth-token';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
};
