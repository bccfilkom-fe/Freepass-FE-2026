"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import AuthLayout from "@/components/layouts/AuthLayout";
import SignInForm from "@/app/(auth)/signin/SignInForm";
import { useRouter } from '@bprogress/next/app';
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";

export default function SignInPageInterceptor() {    
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname.startsWith("/signin");

  const handleOpenChange = (open: boolean) => {
    if (open) return;

    // Close button / overlay click: go back to the previous route.
    // Fallback to /home if there is no history (direct visit).
    // if (typeof window !== "undefined" && window.history.length > 1) {
    //   router.back();
    // } else {
      router.replace("/home", { showProgress: true });
    // }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-primary">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <AuthLayout
          level="dialog"
          welcomeTitle="Hello Toeankoe"
          subtitle="Ready to get your best haircut today?"
          footer="Don't have an account yet?"
          footerUrl="/signup"
        >
          <div className="w-full h-fit sticky top-0">
            <Suspense fallback={<div className='flex justify-center items-center p-10'><Spinner/></div>}>
              <SignInForm />
            </Suspense>
          </div>
        </AuthLayout>
      </DialogContent>
    </Dialog>
  );
}