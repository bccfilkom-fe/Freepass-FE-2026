"use server"

import z, { success } from "zod";
import { MovementSchema } from "../lib/zodSchemas";
import { createClient } from "../lib/supabase/server";

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

    const { error } = await supabase.rpc("handle_inventory_movement", {
      p_product_id: product_id,
      p_user_id: userData.user.id,
      p_type: type,
      p_quantity: quantity,
      p_note: note === "" ? null : note,
    });

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: `berhasil create movement`,
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


export async function handleEditMovement(prevstate: FormState, formData: FormData) {
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
  const id = rawData.id;

  try {
    const supabase = await createClient();

    const { error } = await supabase.rpc("handle_inventory_movement", {
      p_product_id: product_id,
      p_type: type,
      p_quantity: quantity,
      p_note: note === "" ? null : note,
      p_movement_id: id
    });

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: `berhasil edit movement`,
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
