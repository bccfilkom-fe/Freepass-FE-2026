"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import SignUpForm from "@/app/(auth)/signup/SignUpForm";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function SignUpPageInterceptor() {    
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname.startsWith("/signup");

  const handleOpenChange = (open: boolean) => {
    if (open) return;

    // if (typeof window !== "undefined" && window.history.length > 1) {
    //   router.back();
    // } else {
      router.replace("/home");
    // }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <AuthLayout
          level="dialog"
          welcomeTitle="Welcome to Toeankoe"
          subtitle='Register your account to get exciting features from Toeankoe.'
          footer="Alreaddy have an account?"
          footerUrl="/signin"
        >
          <div className="w-full h-fit sticky top-0">
            <SignUpForm />
          </div>
        </AuthLayout>
      </DialogContent>
    </Dialog>
  );
}