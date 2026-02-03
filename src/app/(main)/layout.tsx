import { Navbar } from '@/shared/components/navbar';
import { Footer } from '@/shared/components/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className="flex min-h-screen max-w-500 mx-auto flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

