"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Lock, 
  Terminal, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  KeyRound 
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          throw authError;
        }

        router.push("/admin");
      } else {
        // In local demo mode, any valid enterprise email logs in
        localStorage.setItem("quantrix_admin_session", JSON.stringify({ email, timestamp: Date.now() }));
        router.push("/admin");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Invalid authentication credentials.");
      } else {
        setError("Invalid authentication credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoBypass = () => {
    localStorage.setItem(
      "quantrix_admin_session",
      JSON.stringify({ email: "director@quantrix.ai", timestamp: Date.now(), role: "admin" })
    );
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-[#030712] flex items-center justify-center p-4 cyber-grid">
      <div className="max-w-md w-full rounded-2xl bg-[#070d1d] border border-cyan-500/30 p-8 shadow-[0_0_50px_rgba(0,240,255,0.1)] space-y-6 relative overflow-hidden backdrop-blur-xl font-mono text-xs">
        {/* Top scanline pulse */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-white tracking-wider">
            QUANTRIX COMMAND INTERFACE
          </h1>
          <p className="text-[11px] text-slate-400">
            SOVEREIGN ACCESS CONTROL // SECURE SESSION
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-slate-300 uppercase">ENTERPRISE IDENTITY (EMAIL)</label>
            <input
              type="email"
              required
              placeholder="admin@quantrix.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 uppercase">ACCESS CIPHER (PASSWORD)</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>AUTHENTICATE SESSION</span>
              </>
            )}
          </button>
        </form>

        {/* Instant Demo Access (for evaluation without configuring Supabase first) */}
        <div className="pt-4 border-t border-white/10 space-y-3 text-center">
          <button
            type="button"
            onClick={handleDemoBypass}
            className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-cyan-400 hover:border-cyan-500/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ENTER INSTANT PREVIEW MODE</span>
          </button>

          <div className="text-[10px] text-slate-500">
            Uses Supabase Auth when configured or instant evaluator session in demo environments.
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors"
            >
              &larr; Return to Public Portal
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
