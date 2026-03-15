import { Mail, Phone, MapPin, Send, MessageSquareText } from "lucide-react";

// Reusable input class for consistent styling in both themes
const inputCls = [
  "w-full rounded-2xl px-5 py-4 text-sm font-medium",
  "bg-background border-2 border-border",
  "text-foreground placeholder:text-muted-foreground/60",
  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
  "transition-colors duration-150",
  "shadow-inner",
].join(" ");

export function ContactPage() {
  return (
    <div className="w-full bg-background font-sans text-foreground overflow-hidden relative">
      {/* Subtle gradient accent */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] md:h-[700px] z-0 bg-[url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)] bg-cover bg-center opacity-10 dark:opacity-[0.15]"
        style={{
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 70%, transparent)",
        }}
      />
      
      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative text-center mb-16 md:mb-24">
          <div className="relative z-10 pt-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
              Start the <span className="bg-gradient-to-br from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent">Conversation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Secure a technical consultation with our engineering architects to discuss resolving your most critical IT bottlenecks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border-2 border-border rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-8">Direct Lines</h3>
              
              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-0.5">Engineering Support</h4>
                    <p className="text-muted-foreground text-sm mb-1">hello@codroit.com</p>
                    <a href="#" className="text-primary text-sm font-medium hover:underline">Send email &rarr;</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-0.5">Global Headquarters</h4>
                    <p className="text-muted-foreground text-sm mb-1">+1 (800) 555-0198</p>
                    <p className="text-muted-foreground/80 text-xs uppercase tracking-wider">Mon-Fri 08:00 - 18:00 PST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-semibold mb-0.5">San Francisco Office</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Two Embarcadero Center<br/>
                      Suite 800<br/>
                      San Francisco, CA 94111
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border-2 border-primary/20 rounded-3xl p-8">
              <MessageSquareText className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-lg font-bold text-foreground mb-2">Need immediate assistance?</h4>
              <p className="text-muted-foreground text-sm mb-4">Existing clients with SLA contracts can access the 24/7 emergency incident portal.</p>
              <button className="text-sm font-bold text-primary border-b-2 border-primary/40 hover:border-primary transition-colors pb-0.5">
                Go to incident portal
              </button>
            </div>
          </div>
          
          {/* Contact Form Column */}
          <div className="lg:col-span-8">
            <div className="relative bg-card border-2 border-border rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-3xl font-bold text-foreground mb-2 relative z-10">Request a Consultation</h3>
              <p className="text-muted-foreground mb-10 relative z-10">Briefly describe your challenge. An engineer will respond within 24 hours.</p>
              
              <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text"
                      className={inputCls}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Corporate Email</label>
                    <input 
                      type="email"
                      className={inputCls}
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Organization Name</label>
                  <input 
                    type="text"
                    className={inputCls}
                    placeholder="Acme Corporation"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Inquiry Type</label>
                  <div className="relative">
                    <select className={`${inputCls} appearance-none pr-12 cursor-pointer`}>
                      <option value="" disabled>Select a category...</option>
                      <option value="cloud">Cloud Migration & Architecture</option>
                      <option value="security">Cybersecurity Audit</option>
                      <option value="custom">Custom Software Development</option>
                      <option value="consulting">IT Strategy Consulting</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Project Details</label>
                  <textarea 
                    rows={5}
                    className={`${inputCls} resize-none`}
                    placeholder="Provide details about your current architecture, timeline constraints, and desired outcomes."
                  />
                </div>
                
                <div className="pt-2">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-8 py-4 text-sm font-bold text-background hover:opacity-90 transition-opacity shadow-sm">
                    Submit Request
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By submitting this form, you agree to our <a href="#" className="underline underline-offset-2 hover:text-foreground transition-colors">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
