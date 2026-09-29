"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  ExternalLink, 
  Lock, 
  LogOut, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Activity,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { INITIAL_PROJECTS, ProjectItem } from "@/lib/initial-data";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    // Auth check
    const demoSession = localStorage.getItem("quantrix_admin_session");
    if (!demoSession && !isSupabaseConfigured()) {
      router.push("/admin/login");
      return;
    }

    loadProjects();
  }, [router]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch projects, using initial list", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    localStorage.removeItem("quantrix_admin_session");
    router.push("/admin/login");
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setDeleteId(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const saasCount = projects.filter((p) => p.category === "SaaS").length;
  const autoCount = projects.filter((p) => p.category === "Automation").length;
  const rdCount = projects.filter((p) => p.category === "R&D").length;
  const publishedCount = projects.filter((p) => p.status === "published").length;

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#070d1d] border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white font-mono">
                  QUANTRIX CONTROL PLANE
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  ADMIN ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                SOVEREIGN DATABASE & STORAGE MANAGER
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              Public Site &rarr;
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-lg bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300 hover:bg-red-900/50 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>TERMINATE SESSION</span>
            </button>
          </div>
        </div>

        {/* Stats HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#070d1d] border border-white/10 space-y-1 font-mono">
            <div className="text-xs text-slate-500">TOTAL DEPLOYMENTS</div>
            <div className="text-2xl font-bold text-white">{projects.length}</div>
            <div className="text-[11px] text-cyan-400">{publishedCount} published live</div>
          </div>

          <div className="p-5 rounded-xl bg-[#070d1d] border border-cyan-500/20 space-y-1 font-mono">
            <div className="text-xs text-slate-500">SAAS PLATFORMS</div>
            <div className="text-2xl font-bold text-cyan-400">{saasCount}</div>
            <div className="text-[11px] text-slate-400">Pillar 01</div>
          </div>

          <div className="p-5 rounded-xl bg-[#070d1d] border border-purple-500/20 space-y-1 font-mono">
            <div className="text-xs text-slate-500">AUTONOMOUS SWARMS</div>
            <div className="text-2xl font-bold text-purple-400">{autoCount}</div>
            <div className="text-[11px] text-slate-400">Pillar 02</div>
          </div>

          <div className="p-5 rounded-xl bg-[#070d1d] border border-emerald-500/20 space-y-1 font-mono">
            <div className="text-xs text-slate-500">FRONTIER R&D</div>
            <div className="text-2xl font-bold text-emerald-400">{rdCount}</div>
            <div className="text-[11px] text-slate-400">Pillar 03</div>
          </div>
        </div>

        {/* Actions & Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#070d1d] border border-white/10">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {["All", "SaaS", "Automation", "R&D"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  categoryFilter === cat
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-slate-900 border border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <Link
              href="/admin/projects/new"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>NEW PROJECT</span>
            </Link>
          </div>
        </div>

        {/* Projects Table */}
        <div className="rounded-2xl bg-[#070d1d] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/80 border-b border-white/10 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Deployment</th>
                  <th className="py-3.5 px-4">Pillar</th>
                  <th className="py-3.5 px-4">Tech Prerequisites</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-900/40 transition-colors"
                  >
                    {/* Project Title & Cover */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
                          <Image
                            src={project.cover_image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm font-sans flex items-center gap-1.5">
                            <span>{project.title}</span>
                            {project.featured && (
                              <span className="text-[10px] text-amber-400">★</span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            /{project.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Pillar */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold border ${
                          project.category === "SaaS"
                            ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/40"
                            : project.category === "Automation"
                            ? "bg-purple-950/80 text-purple-300 border-purple-500/40"
                            : "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                        }`}
                      >
                        {project.category}
                      </span>
                    </td>

                    {/* Tech Stack */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.tech_stack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech_stack.length > 3 && (
                          <span className="text-[10px] text-slate-500">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                          project.status === "published"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                            : "bg-slate-800 text-slate-400 border border-white/10"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Preview Public Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="Edit Specification"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => setDeleteId(project.id)}
                          className="p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors"
                          title="Purge Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="max-w-md w-full rounded-2xl bg-[#070d1d] border border-red-500/40 p-6 space-y-4 font-mono text-xs shadow-2xl">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-sm font-bold text-white">
                  CONFIRM PERMANENT DELETION
                </h3>
              </div>
              <p className="text-slate-300">
                This operation will purge this project entry from the database. Are you sure you wish to proceed?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
                >
                  ABORT
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold"
                >
                  PURGE RECORD
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
