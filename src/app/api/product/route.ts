import { createClient } from "@//lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const { data: userData } = await supabase.auth.getUser();

  let query = supabase
    .from('nexstore_product')
    .select('*, nexstore_category!inner(name)')
    .eq("user_id", userData.user?.id)
    .order("id", { ascending: true })

  if (category) query = query.eq("nexstore_category.name", category);

  const { data, error } = await query;

  if (error) return NextResponse.json(
    { error: `Gagal fetch data. ${error.message}` },
    { status: 500 }
  )

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const { user_id, qty, description, title, price, category_id, code } = body;

  const { data, error } = await supabase
    .from('nexstore_product')
    .insert(
      {
        user_id: user_id,
        qty: qty,
        description: description,
        title: title,
        price: price,
        category_id: category_id,
        code: code
      }
    )

  if (error) return NextResponse.json(
    { error: `Gagal membuat produk baru. ${error.message}` },
    { status: 500 }
  )

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}

export async function PATCH(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const { id, qty, description, title, price, category_id, code } = body;

  const { data, error } = await supabase
    .from('nexstore_product')
    .update(
      {
        qty: qty,
        description: description,
        title: title,
        price: price,
        category_id: category_id,
        code: code
      }
    )
    .eq("id", id)

  if (error) return NextResponse.json(
    { error: `Gagal mengupdate produk. ${error.message}` },
    { status: 500 }
  )

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}

export async function DELETE(request: Request) {
  const supabase = await createClient();

  const body = await request.json();
  const { id } = body;

  const { data, error } = await supabase
    .from('nexstore_product')
    .delete()
    .eq("id", id)

  if (error) return NextResponse.json(
    { error: `Gagal menghapus produk. ${error.message}` },
    { status: 500 }
  )

  return NextResponse.json(
    { data },
    { status: 200 }
  )
}