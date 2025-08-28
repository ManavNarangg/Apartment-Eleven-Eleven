import React, { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logoDesktop from "@/assets/logo-desktop-2.png";
import logoMobile from "@/assets/logo-mobile-2.png";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Label } from "recharts";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");


const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-lg border-slate-200/30 shadow-lg"
          : "bg-white/60 backdrop-blur-md border-slate-200/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="group relative z-10 flex items-center">
            {/* Desktop Logo */}
            <img
              src={logoDesktop}
              alt="Apartment Eleven Eleven"
              className="hidden md:block h-8 lg:h-10 w-auto transition-all duration-300 group-hover:scale-105 logo"
            />

            {/* Mobile Logo */}
            <img
              src={logoMobile} // Replace with actual path
              alt="Apartment Eleven Eleven"
              className="block md:hidden h-8 w-8 transition-all duration-300 group-hover:scale-105"
            />
            {/* Fallback text logo (optional) */}
            <span className="sr-only">Apartment 11:11</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {[
                  { to: "/", label: "Home" },
                  { to: "/contact", label: "Elevator's Waiting" },
                  { to: "/our-residents", label: "Our Residents" },
                  { to: "/blogs", label: "On Our Shelves" },
                  { to: "/about", label: "Inside Our Doors"}
                ].map((item) => (
                  <NavigationMenuItem key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-slate-100 hover:text-blue-600",
                        location.pathname === item.to &&
                          "bg-slate-100 text-blue-600"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out border-t border-slate-200/20",
            isMobileMenuOpen
              ? "max-h-96 opacity-100 visible py-4"
              : "max-h-0 opacity-0 invisible py-0 overflow-hidden"
          )}
        >
          <div className="space-y-1">
            {[
              { to: "/", label: "Home" },
              { to: "/contact", label: "Elevator's Waiting" },
              { to: "/our-residents", label: "Our Residents" },
              { to: "/blogs", label: "On Our Shelves" },
              { to: "/about", label: "Inside Our Doors"}
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 hover:bg-slate-100 hover:text-blue-600",
                  location.pathname === item.to && "bg-slate-100 text-blue-600"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 hover:bg-slate-100 hover:text-blue-600"
            >
              About
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
