import { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { signUpSchema } from "@/src/lib/auth/validations/auth";
import z from "zod";
import { authClient } from "@/src/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormErrors = Partial<Record<keyof z.infer<typeof signUpSchema>, string[]>>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const parsed = signUpSchema.safeParse({
      ...formData,
      terms: formData.terms === "on",
    });

    if (!parsed.success) {
      const flattened = z.flattenError(parsed.error);
      setErrors(flattened.fieldErrors);
      return;
    }

    setErrors({});

    const signUpData = {
      name: `${parsed.data.firstName.trim()} ${parsed.data.lastName.trim()}`,
      email: parsed.data.email,
      password: parsed.data.password,
    };

    authClient.signUp.email(
      { ...signUpData },
      {
        onError: (error) => {
          toast.error(
            error.error.message || "Failed to sign up. Please try again!",
          );
        },
        onSuccess: () => {
          toast.success("Account created successfully! 🎉");
          router.push(
            `/auth/verification?email=${encodeURIComponent(signUpData.email)}`,
          );
        },
      },
    );
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            name="email"
            type="email"
            className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary"
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
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
        {errors.password && (
          <ul className="mt-1 text-sm text-red-500 space-y-1">
            {errors.password.map((err) => (
              <li key={err}>• {err}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
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
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword[0]}
          </p>
        )}
      </div>

      <label className="flex items-start">
        <input
          name="terms"
          type="checkbox"
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
      {errors.terms && (
        <p className="mt-1 text-sm text-red-500">{errors.terms[0]}</p>
      )}

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
