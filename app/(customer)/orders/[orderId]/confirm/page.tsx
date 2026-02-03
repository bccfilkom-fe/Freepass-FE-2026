/**
 * Payment Confirmation Page
 * Confirms payment for an order (MVP implementation)
 */

"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfirmPayment } from "@/hooks/use-payment";

interface PaymentConfirmPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

/* Note:
   This page is valid only for prototype,
   for actual production-build it would need vastly different implementation
   so we are not going to abstract anything here, just 'go dirty and get it done' for this one.
*/
export default function PaymentConfirmPage({
  params,
}: PaymentConfirmPageProps) {
  const { orderId } = use(params);
  const router = useRouter();
  const confirmMutation = useConfirmPayment();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const hasConfirmed = useRef(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await confirmMutation.mutateAsync({ orderId });
      setIsConfirmed(true);

      // Redirect back to order detail after 2 seconds
      setTimeout(() => {
        router.push(`/orders/${orderId}`);
      }, 2000);
    } catch (err) {
      console.error("Confirmation failed:", err);
      setIsConfirming(false);
    }
  };

  // Auto-confirm on mount (simulating QR code scan)
   // biome-ignore lint/correctness/useExhaustiveDependencies: mount event only
    useEffect(() => {
    // Prevent double execution in React StrictMode
    if (hasConfirmed.current) return;
    hasConfirmed.current = true;

    const confirmPayment = async () => {
      setIsConfirming(true);
      try {
        await confirmMutation.mutateAsync({ orderId });
        setIsConfirmed(true);

        // Redirect back to order detail after 2 seconds
        setTimeout(() => {
          router.push(`/orders/${orderId}`);
        }, 2000);
      } catch (err) {
        console.error("Confirmation failed:", err);
        setIsConfirming(false);
      }
    };

    confirmPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-2xl min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card className="border-2 overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardTitle className="text-2xl text-center">
              Payment Confirmation
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            {isConfirming && !isConfirmed && (
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-semibold">Processing Payment...</p>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we confirm your payment
                  </p>
                </div>
              </div>
            )}

            {isConfirmed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                >
                  <CheckCircle2 className="w-24 h-24 text-green-600" />
                </motion.div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-green-600">
                    Payment Confirmed!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting you back to order details...
                  </p>
                </div>
              </motion.div>
            )}

            {confirmMutation.isError && (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <p className="font-semibold">Payment confirmation failed</p>
                  <p className="text-sm mt-1">
                    Please try again or contact support if the issue persists.
                  </p>
                </Alert>
                <div className="flex gap-3">
                  <Button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    className="flex-1"
                  >
                    Retry
                  </Button>
                  <Button
                    onClick={() => router.push(`/orders/${orderId}`)}
                    variant="outline"
                    className="flex-1"
                  >
                    Back to Order
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* MVP Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Alert>
            <p className="text-xs text-muted-foreground text-center">
              <strong>MVP Notice:</strong> This is a simplified payment
              confirmation flow for prototype purposes. In production, this
              would integrate with a real payment gateway.
            </p>
          </Alert>
        </motion.div>
      </motion.div>
    </div>
  );
}
