import { TrendingUp, Calendar, FileText, BarChart } from "lucide-react";

export default function ValueProps() {
  const features = [
    {
      icon: TrendingUp,
      title: "Pipeline Clarity",
      desc: "See your entire job search at a glance with our visual pipeline",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      desc: "Auto-import interviews and set intelligent reminders",
    },
    {
      icon: FileText,
      title: "Activity Timeline",
      desc: "Every action logged automatically for complete history",
    },
    {
      icon: BarChart,
      title: "Decision Support",
      desc: "Track offers, compare packages, and make informed choices",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Built for <span className="text-primary">serious</span> job seekers
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Move beyond scattered spreadsheets to a structured system designed
            to scale with your career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-background rounded-xl border border-border 
                                 hover:border-primary transition-all hover:shadow-lg group"
            >
              <div
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4
                           group-hover:bg-primary/20 transition-colors"
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
