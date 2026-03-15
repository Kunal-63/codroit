import {
  ArrowRight,
  Target,
  Hexagon,
  Triangle,
  Command,
  Cpu,
  Globe,
  Gem
} from "lucide-react";

const CLIENTS = [
  { name: "Microsoft", icon: Hexagon },
  { name: "Oracle", icon: Triangle },
  { name: "Salesforce", icon: Command },
  { name: "SAP", icon: Globe },
  { name: "Cisco", icon: Cpu },
  { name: "IBM", icon: Gem },
];

export default function HeroSection() {
  return (
    <div className="relative w-full bg-background text-foreground overflow-hidden font-sans">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-fade-in {
          animation: fadeSlideIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        @keyframes fillWidth {
          from { width: 0%; }
          to { width: 98%; }
        }
        .animate-fill-width {
          animation: fillWidth 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          width: 0%;
        }
      `}</style>

      {/* Background image — absolute (not fixed) */}
      <div
        className="absolute inset-0 z-0 bg-[url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)] bg-cover bg-center opacity-10 dark:opacity-[0.15]"
        style={{
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-32 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">

            <div className="hero-fade-in delay-100 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trusted IT Partner Since 2015</span>
            </div>

            <h1 className="hero-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]">
              The Future<br />
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">
                Depends on IT
              </span>
            </h1>

            <p className="hero-fade-in delay-300 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Codroit delivers end-to-end IT services — from cloud infrastructure and cybersecurity to custom software and 24/7 managed support. One partner. Every technology need.
            </p>

            <div className="hero-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background hover:opacity-90 transition-opacity shadow-lg">
                Get a Free Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/services" className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/50 px-8 py-4 text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-sm">
                Explore Services
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-6 lg:mt-12">

            {/* Stats Card */}
            <div className="hero-fade-in delay-500 relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-lg">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Overall Performance</div>
                    <div className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground">150+</div>
                    <div className="text-sm font-medium text-foreground mt-1">Projects Delivered Successfully</div>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted ring-1 ring-border">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3 mb-8 bg-background/50 rounded-2xl p-5 border border-border overflow-hidden relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-primary/60" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Client Satisfaction Rate</span>
                    <span className="text-2xl font-bold text-foreground">98%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary/60 to-primary animate-fill-width" />
                  </div>
                </div>

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "10+", label: "Years" },
                    { val: "24/7", label: "Support" },
                    { val: "50+", label: "Experts" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center justify-center py-4 px-2 rounded-2xl bg-background/50 border border-border">
                      <span className="text-xl lg:text-2xl font-bold text-foreground">{s.val}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-1">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Status row */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <span className="text-xs text-muted-foreground font-medium">Certified engineering team</span>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-green-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    ALL SYSTEMS OPERATIONAL
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted By Marquee */}
            <div className="hero-fade-in delay-500 relative overflow-hidden rounded-[2rem] border border-border bg-card py-8 shadow-lg">
              <h3 className="mb-6 px-8 text-sm font-medium text-muted-foreground">Trusted by Leading Organizations</h3>
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                }}
              >
                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div key={i} className="flex items-center gap-2 opacity-40 grayscale">
                      <client.icon className="h-5 w-5 text-foreground fill-current" />
                      <span className="text-base font-bold text-foreground tracking-tight">{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
