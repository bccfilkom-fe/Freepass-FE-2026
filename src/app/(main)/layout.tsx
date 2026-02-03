import Sidebar from "@//components/ui/sidebar/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar></Sidebar>
      {/* <p>ini main</p> */}
      <div className="md:ml-64">
        {children}
      </div>
    </>
  );
}