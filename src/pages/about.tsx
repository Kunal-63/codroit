import { Link } from "react-router-dom";
import { Users, Target, Shield, Zap, TrendingUp, Globe2, Award, Briefcase, CheckCircle2 } from "lucide-react";

export function AboutPage() {
  const team = [
    { name: "David Chen", role: "Chief Executive Officer", exp: "15+ yrs Enterprise IT Leadership", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
    { name: "Samantha Hughes", role: "Chief Technology Officer", exp: "Ex-Google Cloud Architect Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" },
    { name: "Marcus Johnson", role: "Head of Cybersecurity", exp: "CISSP & CISM Certified Expert", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
    { name: "Priya Patel", role: "Head of Data & AI", exp: "Ph.D. in Machine Learning", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" }
  ];

  const values = [
    { icon: Users, title: "Client First", desc: "Every decision we make centers on delivering measurable value and long-term success for the businesses we serve." },
    { icon: Target, title: "Precision", desc: "Measure twice, cut once. We engineer with exactitude to prevent costly failures and technical debt." },
    { icon: Shield, title: "Security by Default", desc: "Every architecture and every line of code is designed with security as a first principle, not an afterthought." },
    { icon: Zap, title: "Speed & Reliability", desc: "We balance rapid delivery with architectural integrity — shipping fast without ever compromising quality." },
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

        {/* Hero */}
        <div className="relative mb-24 text-center max-w-4xl mx-auto">
          <div className="relative z-10 pt-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
              Engineering the<br />
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">Future of Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Founded in 2015 by a collective of senior engineers and security architects, Codroit exists to solve the most complex IT challenges facing modern enterprises. We are a full-spectrum technology partner — not a vendor.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-28">
          {[
            { value: "10+", label: "Years of Experience", icon: Briefcase },
            { value: "98%", label: "Client Retention Rate", icon: TrendingUp },
            { value: "150+", label: "Projects Delivered", icon: Award },
            { value: "50+", label: "Certified Engineers", icon: Globe2 }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-border bg-card hover:bg-muted/30 transition-colors duration-200">
              <stat.icon className="w-6 h-6 text-primary mb-3" />
              <div className="text-4xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest text-center">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-28">
          <div className="relative h-[480px] rounded-3xl overflow-hidden border border-border group">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="Team collaborating"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm px-4 py-2 border border-border text-sm font-medium text-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Headquarters — San Francisco, CA
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">The Codroit Difference</h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We don't just sell technology services — we embed deeply into your organization and build solutions that last. Our approach is outcome-driven: every engagement starts with your business objectives and works backward to the right technology stack.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Clients Stay</h2>
              <ul className="space-y-3">
                {[
                  "Dedicated senior engineer on every account",
                  "Transparent pricing, no hidden costs",
                  "SLA-backed uptime and response guarantees",
                  "Full knowledge transfer — no vendor lock-in"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity">
              Start a Conversation
            </Link>
          </div>
        </div>

        {/* Team */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Leadership</p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">Executive Team</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Decades of combined experience scaling infrastructure for Fortune 500s and high-growth startups.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <div key={i} className="group rounded-2xl border border-border bg-card p-4 hover:border-primary/30 hover:bg-muted/20 transition-colors duration-200">
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                <div className="text-primary text-sm font-medium mt-0.5">{member.role}</div>
                <div className="text-xs text-muted-foreground mt-1">{member.exp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="relative rounded-3xl border-2 border-border bg-card p-12 md:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How We Operate</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Principles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div key={i} className="bg-background rounded-2xl border border-border p-7 hover:border-primary/30 hover:bg-muted/20 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
