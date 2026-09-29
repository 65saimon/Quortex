"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Lock, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";

export default function Footer() {
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-slate-100 dark:bg-[#030712] border-t border-slate-200 dark:border-white/10 overflow-hidden text-slate-700 dark:text-slate-300">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40">
                <div className="w-3.5 h-3.5 rounded-sm bg-cyan-500 dark:bg-cyan-400 rotate-45" />
              </div>
              <span className="font-bold text-lg tracking-wider text-slate-900 dark:text-white font-mono">
                QUANTRIX <span className="text-cyan-600 dark:text-cyan-400">INTELLIGENCE</span>
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Architecting mission-critical SaaS infrastructure, autonomous agent swarms, and frontier algorithmic R&D for organizations shaping the next century.
            </p>

            {/* Live System Diagnostics Box */}
            <div className="p-3 rounded-lg bg-white dark:bg-[#070d1d] border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-600 dark:text-slate-400 space-y-1.5 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-500">NODE ID:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">QNTX-CORE-US-EAST</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-500">TIMESTAMP (UTC):</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{utcTime || "SYNCING..."}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-500">CONSENSUS STATUS:</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  STABLE (0.00% DRIFT)
                </span>
              </div>
            </div>
          </div>

          {/* Solutions / Pillars */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-slate-300 font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              Strategic Pillars
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/#services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Enterprise SaaS Systems
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Autonomous Agent Swarms
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Frontier Deep Tech R&D
                </Link>
              </li>
              <li>
                <Link href="/#thesis-consultancy" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">ACADEMIC</span>
                  Thesis Consultancy
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Zero-Trust Architectures
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Case Studies & Proofs
                </Link>
              </li>
            </ul>
          </div>

          {/* Capability Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-slate-300 font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
              Technologies
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/#tech" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Post-Quantum Cryptography
                </Link>
              </li>
              <li>
                <Link href="/#tech" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Edge Neural Transformers
                </Link>
              </li>
              <li>
                <Link href="/#tech" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Distributed Event Meshes
                </Link>
              </li>
              <li>
                <Link href="/#tech" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  eBPF Micro-Telemetry
                </Link>
              </li>
              <li>
                <Link href="/#tech" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Autonomous LLM Reasoning
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Compliance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-slate-300 font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              Governance & Trust
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 py-1">
                  <Lock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  Zero-Trust Access Model
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  SOC-2 Type II Certified
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ISO/IEC 27001 Standard
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  GDPR & HIPAA Compliant
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} QUANTRIX INTELLIGENCE GROUP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>SHA-256: 4f88c...b31e9</span>
            <span>RLS POLICIES: ENFORCED</span>
            <span>VERSION 2.4.0-PROD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
