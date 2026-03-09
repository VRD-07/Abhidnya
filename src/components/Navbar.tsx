import { Link, useLocation } from "react-router-dom";
import { Map, Shield, Home, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/map", label: "Map View", icon: Map },
    { to: "/admin", label: "Admin Panel", icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1 text-xl font-bold tracking-tight">
            <span className="text-primary">●</span>
            <span className="text-foreground">Abhidnya</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-primary/20 text-primary"
                    : "text-muted hover:text-foreground hover:bg-secondary"
                }`}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border fade-in">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                isActive(link.to) ? "text-primary bg-primary/10" : "text-muted"
              }`}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
