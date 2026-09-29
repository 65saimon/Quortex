import React from "react";
import Link from "next/link";
import { Lock, ArrowLeft, Plus, ShieldCheck, Terminal } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export const metadata = {
  title: "Quantrix Command Console | Sovereign Admin",
  description: "Secure administrative control plane for Quantrix Intelligence deployments and data assets.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Standalone Admin Command Header */}
      <header className="sticky top-0 z-50 bg-[#070d1d]/90 backdrop-blur-xl border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Admin Identity */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-300 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wider text-white font-mono flex items-center gap-2">
                  QUANTRIX <span className="text-cyan-400">ADMIN CONSOLE</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest">
                  SOVEREIGN CONTROL PLANE
                </span>
              </div>
            </Link>

            {/* Navigation links within Admin section */}
            <nav className="hidden md:flex items-center gap-4 pl-6 border-l border-white/10 text-xs font-mono">
              <Link
                href="/admin"
                className="text-slate-300 hover:text-cyan-400 transition-colors px-2.5 py-1 rounded hover:bg-white/5"
              >
                DEPLOYMENT CATALOG
              </Link>
              <Link
                href="/admin/projects/new"
                className="text-slate-300 hover:text-cyan-400 transition-colors px-2.5 py-1 rounded hover:bg-white/5 flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                <span>NEW DEPLOYMENT</span>
              </Link>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ISOLATED SESSION // SECURE</span>
            </div>

            <ThemeToggle />

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded border border-white/10 hover:border-white/20 bg-slate-900/60 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>EXIT TO SITE</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Content Viewport */}
      <div className="flex-grow">{children}</div>
    </div>
  );
}
