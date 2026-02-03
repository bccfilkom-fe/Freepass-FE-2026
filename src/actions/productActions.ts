"use server"
import { createClient } from "@/lib/supabase/server";
import { ProductSchema } from "@/lib/zodSchemas";
import { headers } from "next/headers";
import z from "zod";

type FormState = {
  success: boolean,
  message?: string,
  errors?: {
    code?: string,
    title?: string,
    category_id?: string,
    description?: string,
    price?: string,
    qty?: string,
  },
  fields?: {
    code: string,
    title: string,
    category_id: string,
    description: string,
    price: string,
    qty: string,
  }
}

export async function handleCreateProduct(prevState: FormState, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validateData = ProductSchema.safeParse(rawData);

  if (!validateData.success) {
    const errors = z.treeifyError(validateData.error);
    return {
      success: false,
      message: "Input tidak valid",
      errors: {
        code: errors.properties?.code?.errors[0],
        title: errors.properties?.title?.errors[0],
        category_id: errors.properties?.category_id?.errors[0],
        description: errors.properties?.description?.errors[0],
        price: errors.properties?.price?.errors[0],
        qty: errors.properties?.qty?.errors[0],
      },
      fields: {
        code: rawData.code as string,
        title: rawData.title as string,
        category_id: rawData.category_id as string,
        description: rawData.description as string,
        price: rawData.price as string,
        qty: rawData.qty as string,
      }
    }
  }

  const code = validateData.data.code;
  const category_id = validateData.data.category_id;
  const description = validateData.data.description;
  const price = validateData.data.price;
  const qty = validateData.data.qty;
  const title = validateData.data.title;

  try {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return {
        success: false,
        message: "Sesi habis, silakan login ulang.",
        errors: {
          code: "",
          title: "",
          category_id: "",
          description: "",
          price: "",
          qty: "",
        },
        fields: {
          code: String(code),
          title: String(title),
          category_id: String(category_id),
          description: String(description),
          price: String(price),
          qty: String(qty),
        }
      };
    }

    const headerList = await headers()
    const host = headerList.get('host');
    const protocol = host?.startsWith('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/api/product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userData.user.id,
        code: code,
        description: description,
        category_id: category_id,
        price: price,
        qty: qty,
        title: title
      }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(`${result.error}`);

    return {
      success: true,
      message: `berhasil create product`,
      errors: {
        code: "",
        title: "",
        category_id: "",
        description: "",
        price: "",
        qty: "",
      },
      fields: {
        code: "",
        title: "",
        category_id: "",
        description: "",
        price: "",
        qty: "",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
      errors: {
        code: "",
        title: "",
        category_id: "",
        description: "",
        price: "",
        qty: "",
      },
      fields: {
        code: String(code),
        title: String(title),
        category_id: String(category_id),
        description: String(description),
        price: String(price),
        qty: String(qty),
      }
    }
  }
}

export async function handleEditProduct(prevState: FormState, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validateData = ProductSchema.safeParse(rawData);

  if (!validateData.success) {
    const errors = z.treeifyError(validateData.error);
    return {
      success: false,
      message: "Input tidak valid",
      errors: {
        code: errors.properties?.code?.errors[0],
        title: errors.properties?.title?.errors[0],
        category_id: errors.properties?.category_id?.errors[0],
        description: errors.properties?.description?.errors[0],
        price: errors.properties?.price?.errors[0],
        qty: errors.properties?.qty?.errors[0],
      },
      fields: {
        code: rawData.code as string,
        title: rawData.title as string,
        category_id: rawData.category_id as string,
        description: rawData.description as string,
        price: rawData.price as string,
        qty: rawData.qty as string,
      }
    }
  }

  const id = Number(rawData.id);
  const code = validateData.data.code;
  const category_id = validateData.data.category_id;
  const description = validateData.data.description;
  const price = validateData.data.price;
  const qty = validateData.data.qty;
  const title = validateData.data.title;

  try {
    const headerList = await headers()
    const host = headerList.get('host');
    const protocol = host?.startsWith('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`

    const res = await fetch(`${baseUrl}/api/product`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        code: code,
        description: description,
        category_id: category_id,
        price: price,
        qty: qty,
        title: title
      }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(`${result.error}`);
    
    return {
      success: true,
      message: `berhasil update product`,
      errors: {
        code: "",
        title: "",
        category_id: "",
        description: "",
        price: "",
        qty: "",
      },
      fields: {
        code: "",
        title: "",
        category_id: "",
        description: "",
        price: "",
        qty: "",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
      errors: {
        code: "",
        title: "",
        category_id: "",
        description: "",
        price: "",
        qty: "",
      },
      fields: {
        code: String(code),
        title: String(title),
        category_id: String(category_id),
        description: String(description),
        price: String(price),
        qty: String(qty),
      }
    }
  }
}