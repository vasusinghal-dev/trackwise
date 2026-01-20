import { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in");
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="email"
              required
              className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-text-secondary" />
              ) : (
                <Eye className="w-5 h-5 text-text-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="ml-2 text-sm text-text-secondary">Remember me</span>
        </label>
        <a
          href="#"
          className="text-sm text-primary hover:text-primary-hover font-medium"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Lock className="w-5 h-5" />
        Sign In
      </button>
    </form>
  );
}
