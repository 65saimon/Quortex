"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  Terminal, 
  Menu, 
  X, 
  Layers, 
  Sparkles, 
  Lock,
  ArrowRight
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Pillars & Services", href: "/#services" },
    { name: "Thesis Consultancy", href: "/#thesis-consultancy" },
    { name: "Case Studies", href: "/projects" },
    { name: "Tech Matrix", href: "/#tech" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#030712]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-slate-200/40 dark:border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Status Indicator */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <div className="w-4 h-4 rounded-sm bg-cyan-500 dark:bg-cyan-400 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-ping opacity-25" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-wider text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
                  QUANTRIX
                  <span className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/30">
                    INTEL
                  </span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 uppercase font-mono">
                  Autonomous Systems
                </span>
              </div>
            </Link>

            {/* Live Operational Status Tag (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>QUANTRIX CORE // ONLINE</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">99.99% UPTIME</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-cyan-600 dark:hover:text-cyan-300 ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/#contact"
              className="relative group overflow-hidden rounded-md p-px font-medium text-xs text-white shadow-2xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 group-hover:opacity-90" />
              <span className="relative flex items-center gap-2 rounded-md bg-slate-900 dark:bg-[#070d1d] px-4 py-2 transition-colors duration-300 group-hover:bg-transparent text-white">
                <span>Engage Team</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button & Mobile Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#070d1d]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 shadow-xl">
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-900/60 rounded border border-emerald-200 dark:border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>QUANTRIX CORE // ONLINE (&lt; 10ms)</span>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md shadow-md"
            >
              <span>Initiate Engagement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
