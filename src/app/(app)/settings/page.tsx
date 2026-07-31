'use client';

import { useState } from 'react';
import { Settings, Bell, Shield, Palette, Smartphone, Globe, Check } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState('appearance');
  
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="w-full max-w-5xl space-y-8 animate-fade-up relative z-10 pb-12">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={28} className="text-brand" />
        <h1 className="text-3xl font-bold text-primary tracking-tight pb-1">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation Sidebar (internal) */}
        <div className="col-span-1 space-y-2">
          {[
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'devices', label: 'Devices', icon: Smartphone },
            { id: 'language', label: 'Language & Region', icon: Globe },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-brand/10 text-brand' 
                  : 'text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          
          {/* Appearance Section */}
          {activeTab === 'appearance' && (
            <div className="glass-panel p-6 shadow-sm animate-fade-in">
              <h2 className="text-lg font-semibold text-primary mb-1">Appearance</h2>
              <p className="text-sm text-secondary mb-6">Customize how TaskMatrix looks on your device.</p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light' },
                  { id: 'dark', label: 'Dark' },
                  { id: 'system', label: 'System' }
                ].map(t => (
                  <div 
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-all ${
                      theme === t.id 
                        ? 'border-brand bg-brand/5' 
                        : 'border-border-subtle hover:border-border-strong'
                    }`}
                  >
                    <div className={`w-full h-20 rounded-lg border border-border-subtle flex items-center justify-center ${
                      t.id === 'light' ? 'bg-zinc-100' : t.id === 'dark' ? 'bg-zinc-900' : 'bg-gradient-to-br from-zinc-100 to-zinc-900'
                    }`}>
                      {theme === t.id && (
                        <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shadow-md">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-primary">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === 'notifications' && (
            <div className="glass-panel p-6 shadow-sm animate-fade-in">
              <h2 className="text-lg font-semibold text-primary mb-1">Notifications</h2>
              <p className="text-sm text-secondary mb-6">Choose what updates you want to receive.</p>
              
              <div className="space-y-4">
                {[
                  { title: 'Email Notifications', desc: 'Receive daily summaries and important mentions.', state: emailNotifs, setter: setEmailNotifs },
                  { title: 'Push Notifications', desc: 'Get real-time alerts in your browser.', state: pushNotifs, setter: setPushNotifs },
                  { title: 'Marketing Emails', desc: 'Receive news about product updates and features.', state: marketing, setter: setMarketing },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-border-subtle">
                    <div>
                      <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => item.setter(!item.state)}
                      className={`w-11 h-6 rounded-full relative transition-colors ${item.state ? 'bg-brand' : 'bg-border-strong'}`}
                    >
                      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${item.state ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeTab === 'security' && (
            <div className="glass-panel p-6 shadow-sm animate-fade-in">
              <h2 className="text-lg font-semibold text-primary mb-1">Security</h2>
              <p className="text-sm text-secondary mb-6">Manage your password and secure your account.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-3">Change Password</h3>
                  <div className="space-y-3">
                    <input type="password" placeholder="Current password" className="w-full bg-black/5 dark:bg-white/5 border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand" />
                    <input type="password" placeholder="New password" className="w-full bg-black/5 dark:bg-white/5 border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand" />
                    <input type="password" placeholder="Confirm new password" className="w-full bg-black/5 dark:bg-white/5 border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand" />
                  </div>
                  <button className="mt-3 px-4 py-2 rounded-lg bg-surface border border-border-strong text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    Update Password
                  </button>
                </div>
                
                <div className="pt-6 border-t border-border-subtle flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">Two-Factor Authentication</h3>
                    <p className="text-xs text-muted mt-1">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-colors shadow-sm">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Devices Section */}
          {activeTab === 'devices' && (
            <div className="glass-panel p-6 shadow-sm animate-fade-in">
              <h2 className="text-lg font-semibold text-primary mb-1">Your Devices</h2>
              <p className="text-sm text-secondary mb-6">Manage the devices you are currently logged in to.</p>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm">
                      <Smartphone size={20} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary">Mac OS • Chrome</h3>
                      <p className="text-xs text-muted mt-0.5">San Francisco, USA • 192.168.1.1</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-success-bg text-success text-[10px] font-bold uppercase tracking-wider">Active Now</span>
                </div>

                <div className="flex items-start justify-between p-4 rounded-xl border border-border-subtle">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                      <Smartphone size={20} className="text-muted" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary">Windows 11 • Edge</h3>
                      <p className="text-xs text-muted mt-0.5">New York, USA • 10.0.0.45 • Yesterday, 14:20</p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-error hover:text-error/80 transition-colors">
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Language Section */}
          {activeTab === 'language' && (
            <div className="glass-panel p-6 shadow-sm animate-fade-in">
              <h2 className="text-lg font-semibold text-primary mb-1">Language & Region</h2>
              <p className="text-sm text-secondary mb-6">Set your language, timezone, and regional preferences.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Display Language</label>
                  <select className="w-full md:w-1/2 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-brand appearance-none cursor-pointer">
                    <option value="en">English (US)</option>
                    <option value="es">Español (Spanish)</option>
                    <option value="fr">Français (French)</option>
                    <option value="de">Deutsch (German)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Timezone</label>
                  <select className="w-full md:w-1/2 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-brand appearance-none cursor-pointer">
                    <option value="pst">Pacific Time (US & Canada)</option>
                    <option value="est">Eastern Time (US & Canada)</option>
                    <option value="utc">UTC (Coordinated Universal Time)</option>
                    <option value="cet">Central European Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Date Format</label>
                  <select className="w-full md:w-1/2 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-brand appearance-none cursor-pointer">
                    <option value="mdy">MM/DD/YYYY (12/31/2026)</option>
                    <option value="dmy">DD/MM/YYYY (31/12/2026)</option>
                    <option value="ymd">YYYY-MM-DD (2026-12-31)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button className="px-6 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-hover hover:scale-[1.02] transition-all shadow-md">
              Save Preferences
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
