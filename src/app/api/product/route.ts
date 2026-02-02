import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let query = supabase
        .from('nexstore_product')
        .select()

  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) return NextResponse.json(
    { error: "Gagal fetch data." },
    { status: 500 }
  )

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}