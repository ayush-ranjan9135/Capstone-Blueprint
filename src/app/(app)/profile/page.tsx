'use client';

import { useAuthStore } from '@/stores/authStore';
import { User, Mail, Shield, Building, Clock } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-3xl space-y-8 animate-fade-up relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold gradient-text tracking-tight pb-1">Profile Settings</h1>
        <p className="text-sm mt-1 text-secondary font-medium">Manage your personal information and preferences.</p>
      </div>

      <div className="glass-panel p-8">
        <div className="flex items-start gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold text-white gradient-bg shadow-[0_0_20px_rgba(147,51,234,0.3)] ring-4 ring-base/50">
              {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <button className="text-xs font-bold px-4 py-2 rounded-lg bg-overlay hover:bg-border-subtle text-primary transition-all duration-200 border border-border-strong hover:border-brand-muted hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              Change Avatar
            </button>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2 block">Full Name</label>
                <div className="relative group">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-brand transition-colors" />
                  <input type="text" defaultValue={user?.displayName || ''} 
                    className="w-full pl-10 pr-4 py-3 glass-input rounded-xl text-sm text-primary font-medium focus:outline-none" />
                </div>
              </div>
              
              <div>
                <label className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2 block">Email Address</label>
                <div className="relative group">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-brand transition-colors" />
                  <input type="email" defaultValue={user?.email || ''} 
                    className="w-full pl-10 pr-4 py-3 glass-input rounded-xl text-sm text-primary font-medium focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2 block">Role</label>
                <div className="relative">
                  <Shield size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/70" />
                  <input type="text" defaultValue={user.role} readOnly
                    className="w-full pl-10 pr-4 py-3 bg-overlay/50 border border-border-subtle rounded-xl text-sm text-muted/80 font-medium cursor-not-allowed opacity-80" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2 block">Department</label>
                <div className="relative group">
                  <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-brand transition-colors" />
                  <input type="text" defaultValue="Engineering"
                    className="w-full pl-10 pr-4 py-3 glass-input rounded-xl text-sm text-primary font-medium focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="border-t border-border-subtle/50 pt-8 flex justify-end">
              <button className="text-sm font-bold px-6 py-3 rounded-xl text-white gradient-bg shadow-[0_4px_14px_rgba(99,102,241,0.39)] transition-all duration-200 transform hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] active:scale-95">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-sm font-bold text-primary mb-5 flex items-center gap-2">
          <Clock size={16} className="text-brand" />
          Recent Sessions
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between items-center py-4 border-b border-border-subtle/40 last:border-0 hover:bg-base/30 px-3 rounded-lg transition-colors -mx-3">
            <div>
              <p className="font-semibold text-primary">Mac OS • Chrome</p>
              <p className="text-xs text-muted mt-1 tracking-wide">San Francisco, USA • 192.168.1.1</p>
            </div>
            <span className="text-xs font-bold text-success bg-success-bg px-2.5 py-1.5 rounded-md border border-success/20 shadow-sm">Active Now</span>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-border-subtle/40 last:border-0 hover:bg-base/30 px-3 rounded-lg transition-colors -mx-3">
            <div>
              <p className="font-semibold text-primary">Windows 11 • Edge</p>
              <p className="text-xs text-muted mt-1 tracking-wide">New York, USA • 10.0.0.45</p>
            </div>
            <span className="text-xs font-medium text-secondary">Yesterday, 14:20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
