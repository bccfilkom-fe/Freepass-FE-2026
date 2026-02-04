"use client"

import { handleLogin } from "@//actions/authActions";
import BtnBulat from "@//components/BtnBulat";
import LineBar from "@//components/LineBar";
import { useToastStore } from "@//stores/ToastStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react"
import { success } from "zod";

function Login() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const router = useRouter();

  const [state, formAction, pending] = useActionState(handleLogin, {
    success: false,
    message: "",
    email: "",
    user: null
  })

  const toastStore = useToastStore();

  useEffect(() => {
    if (state.message) toastStore.addToast(state.success, state.message);
    if (state.success && state.user) {
      router.push('/dashboard');
      router.refresh();
    }
  }, [state, router])

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="max-w-9/10">
          <div className="fixed bottom-0 m-5 opacity-70">
            <p className="text-center">You can login using email:<span className="underline">guest@gmail.com</span> password:<span className="underline">Ab1!cd</span> or create your own account</p>
          </div>
          <div className="shadow-xl rounded-2xl flex max-w-4xl max-h-[80dvh] overflow-clip items-center">
            <div className="md:w-1/2 p-15">
              <h2 className="font-bold text-3xl text-black">Login</h2>
              <p className="text-sm mt-4 text-black">Login if you already have an account.</p>


              <form action={formAction} className="flex flex-col gap-4">
                <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" required
                  defaultValue={state && state.email}
                ></input>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} className="p-2 rounded-xl border w-full" name="password" id="password" placeholder="Password" required></input>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" id="togglePassword"
                    className={`${showPass ? "hidden" : ""} absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100
                `} viewBox="0 0 16 16" onClick={() => setShowPass(!showPass)}>
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z">
                    </path>
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z">
                    </path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className={`${!showPass ? "hidden" : ""} absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer`}
                    id="mama" viewBox="0 0 16 16" onClick={() => setShowPass(!showPass)}
                  >
                    <path
                      d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z">
                    </path>
                    <path
                      d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z">
                    </path>
                  </svg>
                </div>

                <button type="submit" className="disabled:opacity-50" disabled={pending}>
                  <BtnBulat teks={pending ? "Memproses..." : "Login"} btnBg="bg-black" pointerBg="bg-slate-300" border="none" cl="text-white rounded-xl " ></BtnBulat>
                </button>
              </form>
              {/* {state &&
                state.success ?
                <p className="text-sm mt-2">{state.message}</p>
                :
                <p className="text-sm mt-2 text-red-700">✖ {state.message}</p>
              } */}
              <div className="mt-4 text-sm md:text-xs flex gap-2 items-baseline container-mr">
                <p className="mr-3 md:mr-0">If you don&apos;t have an account</p>
                <Link href='/register' className="**:font-bold"><LineBar>register</LineBar></Link>
              </div>
            </div>
            <div className="md:block hidden w-1/2">
              <img className="" src="https://images.unsplash.com/photo-1562102926-edce05ec6621?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="login form image"></img>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login