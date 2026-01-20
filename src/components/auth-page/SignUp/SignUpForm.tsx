import { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up");
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            First Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Last Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            placeholder="Doe"
          />
        </div>
      </div>

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

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            required
            className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5 text-text-secondary" />
            ) : (
              <Eye className="w-5 h-5 text-text-secondary" />
            )}
          </button>
        </div>
      </div>

      <label className="flex items-start">
        <input
          type="checkbox"
          required
          className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2 mt-1"
        />
        <span className="ml-2 text-sm text-text-secondary">
          I agree to the{" "}
          <a href="#" className="text-primary hover:text-primary-hover">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary-hover">
            Privacy Policy
          </a>
        </span>
      </label>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <User className="w-5 h-5" />
        Create Account
      </button>
    </form>
  );
}
