import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./ui/logo";

export function Footer() {
  return (
    <footer className="relative bg-background pt-24 pb-8 overflow-hidden">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-4 lg:col-span-5">
            <Link to="/" className="flex items-center mb-6 group inline-flex">
              <Logo className="transition-opacity group-hover:opacity-80" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              Your end-to-end IT partner — cloud, security, software, data, and managed services for enterprises worldwide.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-full hover:bg-muted/50">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Services</h3>
              <ul className="space-y-4">
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">Enterprise Arch</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">Cloud Native</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">Cybersecurity</Link></li>
                <li><Link to="/services" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">DevOps</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Company</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">About Us</Link></li>
                <li><Link to="/portfolio" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">Our Work</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">Careers</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors block">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-foreground font-semibold mb-6 text-sm tracking-wider uppercase">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to our newsletter for the latest tech insights.</p>
            <form className="flex group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border border-border rounded-l-full px-5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full transition-all"
              />
              <button
                type="submit"
                className="bg-foreground text-background px-5 py-2.5 rounded-r-full text-sm font-semibold hover:bg-foreground/90 transition-colors flex items-center justify-center border border-foreground"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Codroit. All rights reserved.
            </p>
            <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-border" />
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <span className="w-1 h-1 rounded-full bg-border" />
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
