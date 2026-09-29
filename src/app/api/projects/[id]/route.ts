import { NextRequest, NextResponse } from "next/server";
import { ProjectSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = ProjectSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          issues: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isConfigured =
      supabaseUrl && !supabaseUrl.includes("placeholder-project");

    if (isConfigured) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("projects")
        .update(validation.data)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    return NextResponse.json({ message: "Updated in preview mode", id, ...validation.data });
  } catch (err: unknown) {
    console.error("PUT /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isConfigured =
      supabaseUrl && !supabaseUrl.includes("placeholder-project");

    if (isConfigured) {
      const supabase = createAdminClient();
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: `Project ${id} deleted.` });
  } catch (err: unknown) {
    console.error("DELETE /api/projects/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
