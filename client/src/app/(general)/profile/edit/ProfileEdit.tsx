'use client'

import MainButton from '@/components/button/MainButton'
import Input from '@/components/input/Input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ChangeDisplayNameCredentials, ChangeDisplayNameSchema, ChangePasswordCredentials, ChangePasswordSchema } from '@/schema/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquareWarning } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { InputCard } from './InputCard'
import { useSession } from '@/hooks/useSession'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { changeCustomerPassword, deleteCustomerAccount, updateDisplayName } from '@/services/customer.service'

const ProfileEdit = () => {
  return (
    <section className='w-full p-2 py-5 sm:p-5'>
      <header className='text-2xl font-semibold'>
        <h1>Edit Profile</h1>
      </header>

      <main className='w-full flex flex-col gap-5 max-w-5xl mx-auto mt-5'>
        <ChangeDisplayName/>
        <ChangePassword />
        <SelfDelete />
      </main>
    </section>
  )
}

export default ProfileEdit


const ChangeDisplayName = () => {
  const { user } = useSession()
  const mutation = useMutation({
    mutationFn: updateDisplayName,
    onSuccess: (data) => {
      useSession.getState().updateUser(data.data)
      toast.success(data.message)
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? "Update display name failed");
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeDisplayNameCredentials>({
    resolver: zodResolver(ChangeDisplayNameSchema),
    mode: "onChange",
    defaultValues: {
      displayName: user?.displayName
    }
  });

  const handleResponseUpdate = (data: ChangeDisplayNameCredentials) => {
    mutation.mutate(data)
  };

  return (
    <InputCard title='Display Name'>
      <form className='w-full flex flex-col items-start sm:items-center sm:flex-row gap-4' onSubmit={handleSubmit(handleResponseUpdate)}>
        <Input
          {...register("displayName")}
          className='w-full'
          error={errors.displayName?.message}
        />

        <MainButton
          className='w-full sm:w-fit'
          type='submit'
          variant='secondary'
          isLoading={mutation.isPending}
          disabled={!!(errors.displayName)}
        >
          Change
        </MainButton>
      </form>
    </InputCard>
  )
}


const ChangePassword = () => {
  const mutation = useMutation({
    mutationFn: changeCustomerPassword,
    onSuccess: (data) => {
      reset()
      toast.success(data.message)
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? "Change password failed");
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordCredentials>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });

  const handleResponseUpdate = async (data: ChangePasswordCredentials) => {
    mutation.mutate(data)
  };

  return (
    <InputCard title='Password'>
      <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(handleResponseUpdate)}>
        <Input
          {...register("oldPassword")}
          className='w-full'
          error={errors.oldPassword?.message}
          placeholder='●󠁯●󠁯●󠁯●󠁯●󠁯●󠁯●󠁯●󠁯'
          isPassword
          />

        <div className='w-full flex items-center flex-col sm:flex-row gap-4'>
          <Input
            {...register("newPassword")}
            className='w-full'
            error={errors.newPassword?.message}
            placeholder='●󠁯●󠁯●󠁯●󠁯●󠁯●󠁯●󠁯●󠁯'
            isPassword
          />

          <MainButton
            className='w-full sm:w-fit'
            type='submit'
            variant='secondary'
            isLoading={mutation.isPending}
            disabled={!!(errors.oldPassword || errors.newPassword)}
          >
            Change
          </MainButton>
        </div>
      </form>
    </InputCard>
  )
}


const SelfDelete = () => {
  const [open, setIsOpen] = useState(false)
  const { logout } = useSession()

  const handleDelete = async () => {
    try {
      await deleteCustomerAccount()
      logout()
    } catch (error) {
      toast.error((error as Error).message)
    }
  };

  return (
    <>
      <InputCard
        title='Delete Account'
        description='Once you delete your account, you cannot restore it.'
        >
          <MainButton
            variant='destructive'
            onClick={() => setIsOpen(true)}
          >
            Delete Account
          </MainButton>
      </InputCard>

      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account Confirmation</DialogTitle>
            <DialogDescription className='text-xl text-card-foreground'>
              <MessageSquareWarning size={"120"} className='mx-auto my-10'/>
              <p>Once you delete your account, you cannot restore it. Still want to delete your account?</p>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col gap-2 px-5">
            <MainButton
              className='w-full flex-1'
              variant='destructive'
              onClick={() => handleDelete()}
              >
              Delete
            </MainButton>
            <MainButton
              className='w-full flex-1'
              variant='outline'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </MainButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}