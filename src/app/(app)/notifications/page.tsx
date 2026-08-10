'use client';

import { useState } from 'react';
import { Bell, CheckSquare, MessageSquare, FastForward, Info, Check, CheckCircle2 } from 'lucide-react';

// Mock data matching db.json structure
const initialNotifications = [
  {
    id: 'n1',
    type: 'assignment',
    title: 'Task assigned to you',
    body: 'Jordan Ellis assigned you to TM-8: Implement Zustand authStore and Login UI',
    read: false,
    createdAt: '2026-07-29T14:00:00Z',
    timeAgo: '2 hours ago'
  },
  {
    id: 'n2',
    type: 'comment',
    title: 'New comment on TM-3',
    body: "Priya Nair commented: 'Make sure we use the new-york style variant...'",
    read: false,
    createdAt: '2026-07-29T10:30:00Z',
    timeAgo: '5 hours ago'
  },
  {
    id: 'n3',
    type: 'sprint',
    title: 'Sprint 14 starts in 6 days',
    body: 'Sprint 14 — Foundation begins on August 4th. 8 tasks planned.',
    read: false,
    createdAt: '2026-07-29T08:00:00Z',
    timeAgo: '8 hours ago'
  },
  {
    id: 'n4',
    type: 'comment',
    title: 'New comment on TM-4',
    body: "Jordan Ellis commented: 'This is the primary Sprint 13 deliverable...'",
    read: true,
    createdAt: '2026-07-28T09:00:00Z',
    timeAgo: '1 day ago'
  },
  {
    id: 'n5',
    type: 'status',
    title: 'TM-5 marked as Done',
    body: 'Marcus Webb completed: Set up JSON Server with seed data',
    read: true,
    createdAt: '2026-07-29T14:00:00Z',
    timeAgo: '1 day ago'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <CheckSquare size={18} className="text-brand" />;
      case 'comment': return <MessageSquare size={18} className="text-info" />;
      case 'sprint': return <FastForward size={18} className="text-warning" />;
      case 'status': return <CheckCircle2 size={18} className="text-success" />;
      default: return <Info size={18} className="text-muted" />;
    }
  };

  return (
    <div className="w-full max-w-5xl space-y-8 animate-fade-up relative z-10 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <Bell size={28} className="text-brand flex-shrink-0" />
            <h1 className="text-3xl font-bold text-primary tracking-tight pb-1 truncate">Notifications</h1>
          </div>
          <p className="text-sm mt-2 text-secondary font-medium truncate">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-xs font-bold px-4 py-2 rounded-lg bg-overlay hover:bg-border-subtle text-primary transition-all duration-200 border border-border-strong hover:border-brand-muted flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
          >
            <Check size={14} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`glass-panel p-5 transition-all duration-300 relative overflow-hidden group ${
              notification.read ? 'opacity-70 hover:opacity-100' : 'ring-1 ring-brand/30 shadow-[0_4px_20px_rgba(99,102,241,0.08)]'
            }`}
          >
            {!notification.read && (
              <div className="absolute left-0 top-0 bottom-0 w-1 gradient-bg" />
            )}
            
            <div className="flex items-start gap-4">
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${notification.read ? 'bg-base' : 'bg-brand-muted/30'}`}>
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex justify-between items-start gap-4">
                  <h3 className={`text-sm font-bold truncate ${notification.read ? 'text-primary' : 'text-brand'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs font-medium text-muted whitespace-nowrap">
                    {notification.timeAgo}
                  </span>
                </div>
                <p className="text-sm text-secondary mt-1.5 leading-relaxed break-words whitespace-normal">
                  {notification.body}
                </p>
                
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs font-semibold text-brand hover:text-brand-hover mt-3 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-base flex items-center justify-center mb-4">
              <Bell size={24} className="text-muted" />
            </div>
            <h3 className="text-lg font-bold text-primary">All caught up!</h3>
            <p className="text-sm text-secondary mt-2 max-w-sm">
              You don&apos;t have any new notifications right now. Check back later for updates on your tasks and projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
