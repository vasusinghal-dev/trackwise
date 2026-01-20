import { Shield, Zap, Sparkles, Rocket } from "lucide-react";

const features = [
  { icon: Shield, text: "Enterprise-grade security" },
  { icon: Zap, text: "Lightning fast performance" },
  { icon: Sparkles, text: "AI-powered insights" },
  { icon: Rocket, text: "Scale without limits" },
];

export default function FeatureList() {
  return (
    <div className="space-y-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <feature.icon className="w-6 h-6" />
          </div>
          <span className="text-lg">{feature.text}</span>
        </div>
      ))}
    </div>
  );
}
