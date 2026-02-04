import Sidebar from "@//components/ui/sidebar/Sidebar";
import SidebarContainer from "@//components/ui/sidebar/sidebarContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarContainer>
        <Sidebar></Sidebar>
      </SidebarContainer>
      <div className="md:ml-64 mb-20 mt-20 md:mt-0">
        {children}
      </div>
    </>
  );
}