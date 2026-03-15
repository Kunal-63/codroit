import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./ui/logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Work" },
  ];

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center px-4 pt-6">
      <nav 
        className={`w-full max-w-5xl rounded-full transition-colors duration-200 border-2 ${
          scrolled 
            ? "bg-card/95 backdrop-blur-md border-border shadow-lg py-3 px-6" 
            : "bg-background/70 backdrop-blur-sm border-border/50 shadow-md py-4 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <Logo className="scale-75 origin-left" />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center space-x-1 mr-4 bg-muted rounded-full px-2 py-1 border border-border shadow-inner">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                    location.pathname === link.href 
                      ? "bg-background shadow-sm text-foreground ring-2 ring-border" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background hover:opacity-85 transition-opacity shadow-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/60 border border-border/50 transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-card border-2 border-border rounded-3xl p-4 shadow-2xl md:hidden origin-top">
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center px-4 py-4 rounded-2xl text-base font-medium bg-foreground text-background hover:opacity-90 transition-opacity shadow-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
