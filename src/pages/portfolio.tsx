import React from "react";
import { Link } from "react-router-dom";
import { Cloud, ShieldCheck, Code, BarChart, Layers, Headset, ArrowRight, CheckCircle2 } from "lucide-react";

const projects = [
  {
    title: "Enterprise Cloud Migration",
    client: "Quantum Financial",
    category: "Cloud Infrastructure",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60&w=800",
    metrics: [
      { val: "42%", label: "Cost Reduction" },
      { val: "99.98%", label: "Uptime SLA" },
      { val: "40+", label: "Services Migrated" },
    ],
    tags: ["AWS", "Terraform", "Kubernetes"],
    desc: "Migrated 40+ legacy services to AWS with zero downtime. Redesigned network topology, implemented auto-scaling groups, and cut operational costs by 42%.",
  },
  {
    title: "SOC2 & Zero-Trust Security",
    client: "NexaHealth",
    category: "Cybersecurity",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=60&w=800",
    metrics: [
      { val: "8 mo", label: "To SOC2 Certified" },
      { val: "2,000+", label: "Endpoints Secured" },
      { val: "0", label: "Critical Incidents" },
    ],
    tags: ["SOC2 Type II", "Zero-Trust", "HIPAA"],
    desc: "Achieved SOC2 Type II certification in 8 months. Deployed zero-trust architecture across 2,000+ endpoints with 24/7 real-time threat monitoring.",
  },
  {
    title: "Real-time Analytics Platform",
    client: "RetailHub",
    category: "Data Engineering",
    icon: BarChart,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=60&w=800",
    metrics: [
      { val: "2M+", label: "Events / Day" },
      { val: "<100ms", label: "Query Latency" },
      { val: "5×", label: "Faster Insights" },
    ],
    tags: ["Kafka", "Spark", "BigQuery"],
    desc: "Built real-time streaming pipelines processing 2M+ events/day, powering live inventory and sales dashboards across 300+ stores.",
  },
  {
    title: "Custom ERP System",
    client: "Orbis Logistics",
    category: "Software Development",
    icon: Code,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=60&w=800",
    metrics: [
      { val: "65%", label: "Less Manual Work" },
      { val: "3→1", label: "Systems Unified" },
      { val: "20 hrs", label: "Saved Per Week" },
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
    desc: "Replaced 3 disconnected legacy systems with a unified web-based ERP platform, eliminating 65% of manual workflows and saving 20+ staff hours weekly.",
  },
  {
    title: "Kubernetes Platform Engineering",
    client: "Veridian SaaS",
    category: "DevOps & Cloud",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=60&w=800",
    metrics: [
      { val: "2h → 4m", label: "Deploy Time" },
      { val: "100%", label: "CI/CD Automated" },
      { val: "99.9%", label: "Pipeline Reliability" },
    ],
    tags: ["Kubernetes", "GitHub Actions", "Docker"],
    desc: "Built fully automated CI/CD pipelines on Kubernetes, cutting deployment time from 2 hours to under 4 minutes with zero manual intervention.",
  },
  {
    title: "End-to-End Managed IT",
    client: "Prime Manufacturing",
    category: "Managed IT Services",
    icon: Headset,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=60&w=800",
    metrics: [
      { val: "98%", label: "SLA Achieved" },
      { val: "300+", label: "Users Supported" },
      { val: "4 hrs", label: "Avg. Resolution" },
    ],
    tags: ["Helpdesk", "Monitoring", "BCP"],
    desc: "Took over complete IT management for a 300-person manufacturing firm, resolving 98% of helpdesk tickets within SLA in the first 90 days.",
  },
];

const stats = [
  { val: "150+", label: "Projects Delivered" },
  { val: "98%", label: "Client Retention" },
  { val: "10+", label: "Years Experience" },
  { val: "50+", label: "Certified Engineers" },
];

export function PortfolioPage() {
  return (
    <div className="w-full bg-background font-sans text-foreground">
      <div
        className="absolute inset-x-0 top-0 h-[500px] md:h-[700px] z-0 bg-[url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)] bg-cover bg-center opacity-10 dark:opacity-[0.15]"
        style={{
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
        }}
      />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="relative mb-16 text-center max-w-3xl mx-auto">
          <div className="relative z-10 pt-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
              Real Results for<br />
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">Real Clients</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From cloud migrations and cybersecurity to custom software and managed services — delivered with measurable outcomes.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card px-6 py-5 text-center">
              <div className="text-3xl font-bold text-foreground">{s.val}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors duration-150"
            >
              {/* Image thumbnail */}
              <div className="relative h-44 overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                {/* Category label over image */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-card/90 rounded-full px-3 py-1 border border-border">
                    {project.category}
                  </span>
                </div>
                {/* Icon over image */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-card/90 border border-border flex items-center justify-center">
                  <project.icon className="w-4 h-4 text-primary" />
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-grow p-7">
                {/* Card header */}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-foreground leading-snug">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{project.client}</p>
                </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {project.metrics.map((m, j) => (
                  <div key={j} className="rounded-xl bg-muted/50 border border-border px-3 py-3 text-center">
                    <div className="text-base font-bold text-foreground leading-tight">{m.val}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">{project.desc}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted rounded-full px-2.5 py-1 border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-150 flex-shrink-0 ml-3">
                  View case <ArrowRight className="w-3 h-3" />
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 relative rounded-3xl border border-border bg-card p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Ready to be our next case study?</h2>
            <p className="text-muted-foreground mb-7 max-w-md mx-auto text-sm leading-relaxed">
              Tell us your challenge. Our senior engineers will design a solution tailored to your exact needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity shadow-sm">
                Start a Project <CheckCircle2 className="w-4 h-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors duration-150">
                Browse Services
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
