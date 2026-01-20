import { forwardRef } from "react";
import { Rocket, CheckCircle } from "lucide-react";

const SignUpContent = forwardRef<HTMLDivElement>(
  function SignUpContent(_, ref) {
    return (
      <div
        ref={ref}
        className="absolute top-0 left-0 opacity-0 w-1/2 h-full bg-gradient-to-br from-secondary to-primary p-12 flex flex-col justify-center z-10"
      >
        <div className="max-w-md mx-auto w-full text-white">
          <div className="mb-10">
            <Rocket className="w-12 h-12 mb-6" />
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg opacity-90">
              Start your journey with us and unlock a world of possibilities.
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Access to premium features",
              "24/7 dedicated support",
              "Collaborate with teams",
              "Advanced analytics dashboard",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-white/10 rounded-xl backdrop-blur-sm text-center">
            <p className="text-lg font-medium mb-2">No credit card required</p>
            <p className="opacity-90">Start your free 14-day trial today</p>
          </div>
        </div>
      </div>
    );
  },
);

export default SignUpContent;
