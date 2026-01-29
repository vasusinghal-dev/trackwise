"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Globe, LogOut, Trash2, Shield, Key } from "lucide-react";
import { authClient } from "@/src/lib/auth/auth-client";
import { Account } from "better-auth";
import UpdatePasswordForm from "./UpdatePasswordForm";
import ForegetPasswordForm from "@/src/components/auth-page/password-reset/ForegetPasswordForm";
import { formatLastLogin } from "@/src/lib/utils/date";

interface Security {
  twoFactorEnabled: boolean;
  lastLogin: string | null;
  devices: number | null;
}

export default function SecuritySection() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [security, setSecurity] = useState<Security>({
    twoFactorEnabled: false,
    lastLogin: null,
    devices: null,
  });

  useEffect(() => {
    const loadAccounts = async () => {
      const { data: accounts, error } = await authClient.listAccounts();

      if (error) {
        console.error("Failed to load accounts", error);
        return;
      }

      setAccounts(accounts);
      setHasPassword(
        Array.isArray(accounts) &&
          accounts.some((acc) => acc.providerId === "credential"),
      );

      setSecurity((prev) => ({
        ...prev,
        devices: accounts.length,
      }));
    };

    const loadSessionInfo = async () => {
      const { data: session, error } = await authClient.getSession();

      if (error || !session) return;

      setSecurity((prev) => ({
        ...prev,
        lastLogin: formatLastLogin(new Date(session.session.createdAt)),
      }));
    };

    loadAccounts();
    loadSessionInfo();
  }, []);

  const handleLogout = () => {
    // Add logout animation
    gsap.to(".logout-button", {
      x: 10,
      duration: 0.2,
      repeat: 1,
      yoyo: true,
      onComplete: () => {
        console.log("Logging out...");
        // Implement logout logic
      },
    });
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      console.log("Deleting account...");
      // Implement delete account logic
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Security Settings */}
        <div className="space-y-6">
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Security Settings
            </h2>
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-background border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-green-500" />
                    <div>
                      <p className="font-medium text-text-primary">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-text-secondary">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactorEnabled}
                      onChange={(e) =>
                        setSecurity({
                          ...security,
                          twoFactorEnabled: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                {security.twoFactorEnabled && (
                  <p className="text-sm text-green-500">✓ Currently enabled</p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-background border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Key size={20} className="text-text-primary" />
                  <div>
                    <p className="font-medium text-text-primary">Last Login</p>
                    <p className="text-sm text-text-secondary">
                      {security.lastLogin}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">
                      Active Devices
                    </p>
                    <p className="text-sm text-text-secondary">
                      {security.devices} devices connected
                    </p>
                  </div>
                  <button className="text-sm text-primary hover:text-primary-hover">
                    Manage →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Password Change & Account Actions */}
        <div className="space-y-6">
          {/* Password Change Section */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">
                Password
              </h3>
              {hasPassword !== null && !showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all"
                >
                  <Key size={16} />
                  {hasPassword ? "Change Password" : "Set Password"}
                </button>
              )}
            </div>

            {showPasswordForm ? (
              hasPassword ? (
                <UpdatePasswordForm
                  onCancelAction={() => {
                    setShowPasswordForm(false);
                  }}
                />
              ) : (
                <ForegetPasswordForm />
              )
            ) : (
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-sm text-text-secondary">
                  {hasPassword
                    ? "Update your password to keep your account secure."
                    : "Add a password to enable email login and account recovery."}
                </p>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              Account Actions
            </h3>
            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="logout-button w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-background transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <LogOut size={18} className="text-amber-500" />
                  </div>
                  <span className="font-medium text-text-primary">Log Out</span>
                </div>
                <span className="text-sm text-text-secondary group-hover:text-primary">
                  →
                </span>
              </button>

              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-error/30 bg-error/5 hover:bg-error/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-error/10">
                    <Trash2 size={18} className="text-error" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-error">
                      Delete Account
                    </span>
                    <p className="text-xs text-error/70 mt-1">
                      Permanently remove all data
                    </p>
                  </div>
                </div>
                <span className="text-sm text-error group-hover:text-error/70">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
