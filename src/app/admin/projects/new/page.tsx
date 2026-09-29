import React from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata = {
  title: "Deploy New Project | Quantrix Command",
};

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO COMMAND DASHBOARD</span>
          </Link>

          <span className="text-xs font-mono text-slate-500">
            SYSTEM // NEW DEPLOYMENT SPEC
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span>DEPLOY NEW ARCHITECTURAL PROJECT</span>
          </h1>
          <p className="text-sm text-slate-400">
            Publish a new SaaS platform, autonomous swarm, or applied R&D case study to the sovereign catalog.
          </p>
        </div>

        <ProjectForm isEdit={false} />
      </div>
    </main>
  );
}
