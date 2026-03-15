import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/ui/glassmorphism-trust-hero";
import {
  ArrowRight, Shield, Zap, Server, Code, Cloud, Headset,
  CheckCircle2, ChevronRight, MessageSquareQuote, Database, Layers
} from "lucide-react";

export function HomePage() {
  const services = [
    { title: "IT Consulting & Strategy", desc: "Align your technology roadmap with business goals. We assess, plan, and prioritize every initiative for maximum ROI.", icon: Layers },
    { title: "Cloud Infrastructure", desc: "Design, migrate, and optimize workloads on AWS, Azure, and GCP with zero downtime and full compliance.", icon: Cloud },
    { title: "Cybersecurity", desc: "Comprehensive protection — from penetration testing and compliance audits to 24/7 threat monitoring and incident response.", icon: Shield },
    { title: "Custom Software Development", desc: "Build scalable, maintainable applications tailored to your operations using modern frameworks and best engineering practices.", icon: Code },
    { title: "Data & Analytics", desc: "Unlock insights from your data with end-to-end pipeline engineering, business intelligence dashboards, and AI integration.", icon: Database },
    { title: "Managed IT Support", desc: "Round-the-clock helpdesk, proactive maintenance, and dedicated account managers — so you can focus on your business.", icon: Headset },
  ];

  const processSteps = [
    { num: "01", title: "Discovery", desc: "We audit your current infrastructure and understand your business objectives, constraints, and growth targets." },
    { num: "02", title: "Strategy", desc: "We design a precise technology roadmap, defining milestones, team structure, and risk mitigation plans." },
    { num: "03", title: "Execution", desc: "Our engineers implement the strategy with agile sprints, ensuring zero downtime and continuous delivery." },
    { num: "04", title: "Optimization", desc: "Post-launch, we monitor, scale, and continuously improve your systems for peak performance and cost efficiency." }
  ];

  const testimonials = [
    { name: "Sarah Jenkins", role: "CTO, Quantum Financial", text: "Codroit overhauled our entire infrastructure. Their cloud migration cut our operational costs by 40% while doubling our system uptime." },
    { name: "Michael Chang", role: "Director of IT, NexaHealth", text: "Security was our biggest concern. Codroit made us SOC2 compliant and built a layered defense around our patient data. Outstanding engineering." },
    { name: "Elena Rodriguez", role: "VP Engineering, RetailHub", text: "We launched our new ecommerce platform 2 months ahead of schedule. Codroit's team integrated seamlessly with ours and delivered without compromise." }
  ];

  return (
    <div className="w-full bg-background font-sans text-foreground">
      <HeroSection />

      {/* Services Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
            Every IT Service<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">Under One Roof</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            From strategy to execution, infrastructure to software — Codroit is your single IT partner across every domain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:bg-muted/30 transition-colors duration-200 cursor-default"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>
              <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-28 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Our Process</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">How We Deliver<br />Results</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                A proven, engineering-first process that minimizes risk while accelerating your time to value — used across 150+ projects.
              </p>
              <ul className="space-y-4 mb-10">
                {["Zero-downtime migrations guaranteed", "Military-grade encryption standards", "Agile sprints with weekly reporting", "Dedicated account manager & 24/7 helpdesk"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity shadow-sm">
                About Codroit <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-5 rounded-2xl border border-border bg-card p-5 hover:border-primary/30 hover:bg-muted/20 transition-colors duration-200">
                  <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Client Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">What Our Clients Say</h2>
          </div>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            View Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((test, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-7 flex flex-col justify-between hover:border-border/80 transition-colors duration-200">
              <div>
                <MessageSquareQuote className="w-8 h-8 text-primary/30 mb-5" />
                <p className="text-sm text-foreground leading-relaxed mb-6">"{test.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold text-foreground">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{test.name}</div>
                  <div className="text-xs text-muted-foreground">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-border bg-card p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-foreground">Ready to transform your IT infrastructure?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Schedule a free 30-minute strategy call with our senior architects. No obligation, no sales pitch — just expert advice.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity shadow-sm">
                Book Free Consultation <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
