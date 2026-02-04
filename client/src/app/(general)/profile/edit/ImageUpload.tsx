import MainButton from '@/components/button/MainButton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { FileUpload } from "@/components/ui/file-upload";
import { uploadCustomerAvatar } from '@/services/customer.service';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSession } from '@/hooks/useSession';

const ImageUpload = () => {
  const { updateUser } = useSession();
  const [isOpen, setIsOpen] = useState(false)
  const [uploadKey, setUploadKey] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const mutation = useMutation({
    mutationFn: uploadCustomerAvatar,
    onSuccess: (data) => {
      setUploadKey(prev => prev + 1)
      updateUser({ avatarUrl: data.avatarUrl })
      toast.success(data.message)
    },
    onError: (error) => {
      setUploadKey(prev => prev + 1)
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? "Upload file failed");
    }
  })

  const handleFileUpload = (files: File[]) => {
    setFile(files[0])
  }

  return (
    <>
      <MainButton variant='secondary' className='mt-5 sm:ml-3' onClick={() => setIsOpen(true)}>
        Change Image
      </MainButton>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Profile Image</DialogTitle>
            <DialogDescription className='text-sm text-card-foreground'>
              *Make sure the image size is less than 5MB
            </DialogDescription>
          </DialogHeader>

          <FileUpload key={uploadKey} onChange={handleFileUpload} />

          <DialogFooter>
            <MainButton
              isLoading={mutation.isPending}
              variant='secondary'
              className='mt-5 sm:ml-3'
              onClick={() => {
                if (!file) return
                mutation.mutate(file)
              }}>
                Change Image
            </MainButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ImageUpload