"use client";

import { useState } from "react";
import { Bell, Clock } from "lucide-react";

interface Preferences {
  timezone: string;
  reminderLeadTime: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: "light" | "dark" | "system";
}

export default function PreferenceSection() {
  const [preferences, setPreferences] = useState<Preferences>({
    timezone: "America/New_York",
    reminderLeadTime: 15,
    emailNotifications: true,
    pushNotifications: true,
    theme: "system",
  });

  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];

  const reminderOptions = [5, 10, 15, 30, 60];
  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            Notification Preferences
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-text-primary" />
                <div>
                  <p className="font-medium text-text-primary">
                    Email Notifications
                  </p>
                  <p className="text-sm text-text-secondary">
                    Receive updates via email
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-text-primary" />
                <div>
                  <p className="font-medium text-text-primary">
                    Push Notifications
                  </p>
                  <p className="text-sm text-text-secondary">
                    Browser notifications
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.pushNotifications}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      pushNotifications: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            General Settings
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    timezone: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-text-secondary" />
                <label className="text-sm font-medium text-text-primary">
                  Reminder Lead Time
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {reminderOptions.map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() =>
                      setPreferences({
                        ...preferences,
                        reminderLeadTime: minutes,
                      })
                    }
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      preferences.reminderLeadTime === minutes
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-text-primary hover:bg-surface"
                    }`}
                  >
                    {minutes} min
                  </button>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-3">
                How soon before a task deadline you&apos;d like to be reminded
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
