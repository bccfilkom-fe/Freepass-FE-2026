import { Button } from "@/components/ui/button";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

/**
 * Global Error Page
 * Catches errors that occur outside the root layout
 */
export default function GlobalError({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {

   return (
      <html lang="en">
         <body className="min-h-screen antialiased">
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
               <Card className="max-w-md w-full shadow-lg">
                  <CardHeader className="text-center space-y-4 pb-4">
                     <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                     </div>
                     <div className="space-y-2">
                        <CardTitle className="text-2xl">
                           Critical Error Occurred
                        </CardTitle>
                        <CardDescription className="text-base">
                           We encountered a critical error. Please try refreshing the
                           page or return to the home page.
                        </CardDescription>
                     </div>
                     {process.env.NODE_ENV === "development" && error.message && (
                        <details className="text-left mt-4">
                           <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                              Error Details (Development Only)
                           </summary>
                           <pre className="mt-2 p-3 bg-muted rounded-md text-xs overflow-auto max-h-40">
                              {error.message}
                              {error.stack && `\n\n${error.stack}`}
                           </pre>
                        </details>
                     )}
                  </CardHeader>
                  <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
                     <Button onClick={reset} className="flex-1 gap-2" size="lg">
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                     </Button>
                     <Button
                        asChild
                        variant="outline"
                        className="flex-1 gap-2"
                        size="lg"
                     >
                        <a href="/canteens">
                           <Home className="w-4 h-4" />
                           Go to Home
                        </a>
                     </Button>
                  </CardFooter>
               </Card>
            </div>
         </body>
      </html>
   );
}
