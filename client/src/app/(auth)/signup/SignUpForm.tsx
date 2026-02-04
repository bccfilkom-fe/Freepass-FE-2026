'use client'

import MainButton from '@/components/button/MainButton'
import Checkbox from '@/components/checkbox/Checkbox'
import { Lock, UserRound, Check, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInCredentials, SignInSchema, SignUpCredentials, SignUpSchema } from '@/schema/auth.schema'
import Input from '@/components/input/Input'
import { AnimatePresence, motion } from 'motion/react'
import { signUpService } from '@/services/auth.service'
import { AxiosError } from 'axios'

const SignUpForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [onPasswordBlur, setOnPasswordBlur] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignUpCredentials>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const handleResponseSignUp = async (data: SignUpCredentials) => {
    try {
      const { message } = await signUpService(data)

      reset()
      toast.success(message)
    } catch (error) {
      toast.error((error as Error).message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleResponseSignUp)}
      className="flex flex-col gap-3"
    >
      {/* DISPLAY NAME INPUT */}
      <Input
        {...register("displayName")}
        label="Display Name"
        placeholder="toean"
        error={errors.email?.message}
      >
        <UserRound />
      </Input>

      {/* EMAIL INPUT */}
      <Input
        {...register("email")}
        label="Email"
        placeholder="example@toeankoe.com"
        error={errors.email?.message}
      >
        <Mail />
      </Input>

      {/* PASSWORD INPUT */}
      <div className="flex flex-col gap-1">
        <Input
          {...register("password", { onBlur: () => setOnPasswordBlur(true) })}
          label="Password"
          placeholder="********"
          isPassword
        >
          <Lock />
        </Input>
        <p
          className={`text-xs font-light
            ${
              onPasswordBlur &&
              errors.password &&
              watch("password")?.length > 0
                ? "text-pink-600"
                : !errors.password && watch("password")?.length > 0
                ? "text-green-600"
                : ""
            }
          `}
        >
          {!errors.password && watch("password")?.length > 0 && (
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="inline mb-1 mr-1" size={14} />
              </motion.span>
            </AnimatePresence>
          )}
          Password must be at least 6 characters long
        </p>
      </div>

      {/* SUBMIT BUTTON */}
      <MainButton
        variant='secondary'
        className='w-full'
        disabled={(errors.email || errors.password) ? true : false}
        isLoading={isSubmitting}
        type="submit"
      >
        Sign Up
      </MainButton>
    </form>
  )
}

export default SignUpForm