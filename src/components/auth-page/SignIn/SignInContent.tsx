import { forwardRef } from "react";
import { Sparkles } from "lucide-react";
import FeatureList from "./FeatureList";

const SignInContent = forwardRef<HTMLDivElement>(
  function SignInContent(_, ref) {
    return (
      <div
        ref={ref}
        className="absolute top-0 left-0 opacity-0 w-1/2 h-full bg-gradient-to-br from-primary to-secondary p-12 flex flex-col justify-center z-10"
      >
        <div className="max-w-md mx-auto w-full text-white">
          <div className="mb-10">
            <Sparkles className="w-12 h-12 mb-6" />
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg opacity-90">
              We&apos;re thrilled to see you again. Your journey continues here.
            </p>
          </div>

          <FeatureList />

          <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="text-lg italic">
              &quot;The best platform for productivity and collaboration.&quot;
            </p>
          </div>
        </div>
      </div>
    );
  },
);

export default SignInContent;
