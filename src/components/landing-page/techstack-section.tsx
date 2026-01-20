import { SiNextdotjs, SiPrisma, SiPostgresql } from "react-icons/si";

export default function TechStack() {
  const tech = [
    {
      icon: SiNextdotjs,
      name: "Next.js 15",
      desc: "App Router & Server Components",
    },
    {
      icon: SiPrisma,
      name: "Prisma ORM",
      desc: "Type-safe database operations",
    },
    {
      icon: SiPostgresql,
      name: "PostgreSQL",
      desc: "Production-ready database",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-surface rounded-2xl p-8 border border-border">
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            Scalable Architecture
          </h3>
          <p className="text-text-secondary mb-8">
            Built from day one with enterprise-ready architecture—this
            isn&apos;t a toy tracker. It&apos;s a foundation for a real
            decision-support product.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {tech.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-background rounded-lg
                                   hover:border-primary border border-transparent transition-all"
              >
                <div className="text-3xl text-primary">
                  <item.icon />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    {item.name}
                  </h4>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-text-primary">
              <span className="font-semibold">Note for recruiters:</span> This
              project showcases modern full-stack development with TypeScript,
              responsive design, and scalable architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
