"use server"

import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { signUpSchema } from "../lib/zodSchemas";
import { createClient } from "../lib/supabase/server";

type FormState = {
  success: boolean,
  message: string,
  namaError?: string,
  emailError?: string,
  passError?: string,
  email?: string,
  nama?: string,
  user?: User | null
}

export async function handleRegister(prevState: FormState, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errors = z.treeifyError(validatedFields.error);
    return {
      success: false,
      message: `Input tidak valid`,
      email: rawData.email as string,
      nama: rawData.nama as string,
      namaError: errors.properties?.nama?.errors[0],
      emailError: errors.properties?.email?.errors[0],
      passError: errors.properties?.password?.errors[0],
    };
  }

  const nama = formData.get('nama') as string;
  const email = formData.get('email') as string;
  const pass = formData.get('password') as string;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: {
          name: nama,
        }
      }
    })

    if (error) throw new Error(error.message)

    return {
      success: true,
      message: 'Registrasi berhasil!',
      email: email,
      nama: nama,
      namaError: "",
      emailError: "",
      passError: "",
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
      email: email,
      nama: nama,
      namaError: "",
      emailError: "",
      passError: "",
    }
  }
}

export async function handleLogin(prevState: FormState, formData: FormData) {
  const email = formData.get('email') as string;
  const pass = formData.get('password') as string;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    })

    if (error) throw new Error(error.message);

    const cookieStore = await cookies();
    cookieStore.set("session_token", data.session.access_token);

    return {
      success: true,
      message: 'Login Berhasil!',
      user: data.user
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
      email: email,
      user: null
    }
  }
}

export async function handleLogout(prevState: FormState) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) return {
    success: false,
    message: error.message
  }

  const cookieStore = await cookies();
  cookieStore.delete("session_token");

  redirect('/login');

  return {
    success: true,
    message: "Berhasil Logout"
  }
}
