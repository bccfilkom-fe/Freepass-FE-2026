import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - ShipIt',
  description: 'Login to your ShipIt account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-muted/30 to-background p-4">
      {children}
    </main>
  );
}

