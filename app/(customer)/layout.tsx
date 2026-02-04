import ConditionalNavbar from "@/components/conditional-navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="pb-10">{children}</main>
      <ConditionalNavbar />
    </>
  );
}
