"use server"

import { createClient } from "@/lib/supabase/server"
import { categorySchema } from "@/lib/zodSchemas";
import z, { success } from "zod";

type FormState = {
  success: boolean,
  message?: string,
  catError?: string,
  descError?: string,
  fields?: {
    name?: string;
    description?: string | null;
  };
}

export async function handleCreateCategory(prevState: FormState, formData: FormData) {
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
        description: rawData.description as string === "" ? null : rawData.description as string,
      }
    }
  }

  const name = validateData.data.name;
  const description = validateData.data.description === "" ? null : validateData.data.description;

  try {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return {
        success: false,
        message: "Sesi habis, silakan login ulang.",
        catError: "",
        descError: "",
        fields: {
          name: name,
          description: description
        }
      };
    }
    console.log(userData.user.id);

    const { error } = await supabase
      .from("nexstore_category")
      .insert({ name: name, description: description, user_id: userData.user.id });

    if (error) throw new Error(error.message);

    return {
      success: true,
      message: `berhasil create category`,
      catError: "",
      descError: "",
      fields: {
        name: "",
        description: ""
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
