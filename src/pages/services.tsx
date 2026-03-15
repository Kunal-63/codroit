import { Link } from "react-router-dom";
import { Cloud, ShieldCheck, Code, BarChart, Layers, Check, ArrowRight, Headset } from "lucide-react";

export function ServicesPage() {
  const services = [
    {
      id: "consulting",
      icon: Layers,
      title: "IT Consulting & Strategy",
      description: "Align your technology investments with your business strategy. We assess your current state, identify gaps, and build a prioritized technology roadmap with clear ROI.",
      features: ["Technology Audits & Assessments", "Digital Transformation Roadmaps", "Vendor Selection & Management", "IT Governance & Compliance Frameworks"]
    },
    {
      id: "cloud",
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Go beyond basic hosting. We architect, migrate, and optimize enterprise workloads on AWS, Azure, and GCP with zero downtime and full compliance.",
      features: ["Cloud Migration & Lift-and-Shift", "Kubernetes & Container Orchestration", "Infrastructure as Code (Terraform)", "Cloud Cost Optimization & FinOps"]
    },
    {
      id: "security",
      icon: ShieldCheck,
      title: "Cybersecurity Services",
      description: "Proactive defense across your entire attack surface. From compliance audits to real-time threat detection — we keep your data and systems protected.",
      features: ["Penetration Testing & Red Teams", "SOC2, HIPAA, GDPR Compliance", "Zero-Trust Network Architecture", "24/7 Security Operations Center (SOC)"]
    },
    {
      id: "software",
      icon: Code,
      title: "Custom Software Development",
      description: "Mission-critical applications built from the ground up. We specialize in scalable, maintainable, and high-performance software for complex business needs.",
      features: ["Web & Mobile Application Development", "API Design & Microservices", "Legacy System Modernization", "DevOps, CI/CD & Automation"]
    },
    {
      id: "data",
      icon: BarChart,
      title: "Data Engineering & AI",
      description: "Transform raw data into a strategic asset. Our engineers build the pipelines, warehouses, and models that power business intelligence and AI products.",
      features: ["Data Pipeline & ETL Engineering", "Business Intelligence Dashboards", "Machine Learning Model Development", "Custom LLM & AI Agent Integration"]
    },
    {
      id: "managed",
      icon: Headset,
      title: "Managed IT Services",
      description: "Your outsourced IT department. We handle everything from helpdesk support to proactive system monitoring — with SLA-backed response times.",
      features: ["24/7 Helpdesk & Technical Support", "Remote System Monitoring & Alerts", "Backup, Disaster Recovery & BCP", "On-site and Remote Engineering Support"]
    },
  ];

  const engagementModels = [
    {
      title: "Project-Based",
      time: "Fixed Scope",
      desc: "We own full delivery of a defined project — from architecture to launch. Ideal for migrations, new platforms, or one-time infrastructure transformations.",
      best: "Cloud migrations, new software builds"
    },
    {
      title: "Dedicated Team",
      time: "Ongoing",
      desc: "A bespoke team of our engineers operates as a seamless extension of your internal team — fully embedded, fully accountable.",
      best: "Product companies, scaling startups"
    },
    {
      title: "Staff Augmentation",
      time: "Flexible",
      desc: "Specific skill gaps, filled immediately. We place senior engineers directly into your team structure to accelerate in-flight initiatives.",
      best: "Filling specialist skill gaps fast"
    }
  ];

  return (
    <div className="w-full bg-background font-sans text-foreground overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[500px] md:h-[700px] z-0 bg-[url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)] bg-cover bg-center opacity-10 dark:opacity-[0.15]"
        style={{
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
        }}
      />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="relative mb-20 text-center max-w-3xl mx-auto">
          <div className="relative z-10 pt-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
              Every IT Service<br />
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">You'll Ever Need</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Codroit is your single technology partner across infrastructure, security, software, data, and ongoing support. We grow with you.
            </p>
          </div>
        </div>

        {/* Services Grid - Matches Portfolio 3-col style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-28">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8 hover:border-primary/30 hover:bg-muted/20 transition-colors duration-150"
            >
              {/* Header with icon matching portfolio */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-foreground leading-snug">{service.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{service.description}</p>

              {/* Features list */}
              <ul className="space-y-2.5 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Footer matching portfolio tags */}
              <div className="border-t border-border pt-5 mt-auto">
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-150">
                  Discuss this service <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement Models - Matches Home page CTA banner style */}
        <div className="relative rounded-3xl border border-border bg-card p-10 md:p-14 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Flexible Partnerships</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How We Work Together</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">Choose the model that fits your team and timeline. We adapt to you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 border-b border-border pb-12">
              {engagementModels.map((model, i) => (
                <div key={i} className="bg-background border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors duration-150 relative overflow-hidden group">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{model.time}</div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{model.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{model.desc}</p>
                    <div className="text-xs text-muted-foreground bg-muted/50 rounded-xl p-3 border border-border">
                      <span className="font-semibold text-foreground">Best for: </span>{model.best}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background hover:opacity-90 transition-opacity shadow-sm">
                Schedule a Free Consultation
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
