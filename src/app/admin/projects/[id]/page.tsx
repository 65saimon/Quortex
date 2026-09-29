import React from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import { INITIAL_PROJECTS, ProjectItem } from "@/lib/initial-data";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Project Specification | Quantrix Command",
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  let project: ProjectItem | undefined = INITIAL_PROJECTS.find(
    (p) => p.id === id || p.slug === id
  );

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminClient();
      if (supabase) {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .or(`id.eq.${id},slug.eq.${id}`)
          .single();
        if (data) {
          project = data as ProjectItem;
        }
      }
    } catch (err) {
      console.warn("Could not query supabase directly for edit project:", err);
    }
  }

  if (!project) {
    // If id was a mock ID created during this session, use a clean fallback
    project = {
      id,
      slug: `custom-${id}`,
      title: "Active Specification Record",
      tagline: "Custom provisioned system architecture.",
      description: "Detailed system architecture notes and deployment telemetry.",
      category: "SaaS",
      tech_stack: ["Next.js", "TypeScript", "PostgreSQL"],
      cover_image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
      featured: false,
      status: "published",
      created_at: new Date().toISOString(),
    };
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO COMMAND DASHBOARD</span>
          </Link>

          <span className="text-xs font-mono text-slate-500">
            AMENDMENT // {project.slug}
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-2">
            <Edit className="w-6 h-6 text-purple-400" />
            <span>EDIT SPECIFICATION: {project.title}</span>
          </h1>
          <p className="text-sm text-slate-400">
            Amend system parameters, metrics, tech prerequisites, or deployment status.
          </p>
        </div>

        <ProjectForm initialData={project} isEdit={true} />
      </div>
    </main>
  );
}
