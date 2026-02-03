"use server"

import { createClient } from "@/lib/supabase/server"
import { categorySchema, MovementSchema } from "@/lib/zodSchemas";
import { inventory_movement } from "@/types/movements";
import z, { success } from "zod";

type FormState = {
  success: boolean,
  message?: string,
  errors?: {
    product_id?: string,
    type?: string,
    quantity?: string,
    note?: string,
  },
  fields?: {
    product_id?: string,
    type?: string,
    quantity?: string,
    note?: string | null,
  }
}

export async function handleCreateMovement(prevState: FormState, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validateData = MovementSchema.safeParse(rawData);

  if (!validateData.success) {
    const errors = z.treeifyError(validateData.error);
    return {
      success: false,
      message: "Input tidak valid",
      errors: {
        product_id: errors.properties?.product_id?.errors[0],
        type: errors.properties?.type?.errors[0],
        quantity: errors.properties?.quantity?.errors[0],
        note: errors.properties?.note?.errors[0],
      },
      fields: {
        product_id: rawData.product_id as string,
        type: rawData.type as string,
        quantity: rawData.quantity as string,
        note: rawData.note as string === "" ? null : rawData.note as string,
      }
    }
  }

  const { product_id, type, quantity, note } = validateData.data;

  try {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return {
        success: false,
        message: "Sesi habis, silakan login ulang.",
        errors: {
          product_id: "",
          type: "",
          quantity: "",
          note: "",
        },
        fields: {
          product_id: String(product_id),
          type: String(type),
          quantity: String(quantity),
          note: String(note),
        }
      };
    }

    const { error } = await supabase
      .from("nexstore_inventory_movements")
      .insert({ user_id: userData.user.id, product_id: product_id, type: type, quantity: quantity, note: note === "" ? null : note });

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: `berhasil create category`,
      errors: {
        product_id: "",
        type: "",
        quantity: "",
        note: "",
      },
      fields: {
        product_id: "",
        type: "",
        quantity: "",
        note: "",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
      errors: {
        product_id: "",
        type: "",
        quantity: "",
        note: "",
      },
      fields: {
        product_id: String(product_id),
        type: String(type),
        quantity: String(quantity),
        note: String(note),
      }
    }
  }
}


export async function handleEditCategory(prevstate: FormState, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validateData = categorySchema.safeParse(rawData);

  if (!validateData.success) {
    const errors = z.treeifyError(validateData.error);
    return {
      success: false,
      message: "Input tidak valid",
      catError: errors.properties?.name?.errors[0],
      descError: errors.properties?.description?.errors[0],
      fields: {
        name: rawData.name as string,
        description: rawData.description as string
      }
    }
  }

  const name = validateData.data.name;
  const description = validateData.data.description;
  const id = rawData.id;

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("nexstore_category")
      .update({ name: name, description: description })
      .eq("id", id);

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: `berhasil edit category`,
      catError: "",
      descError: "",
      fields: {
        name: name,
        description: description
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
      catError: "",
      descError: "",
      fields: {
        name: name,
        description: description
      }
    }
  }
}
