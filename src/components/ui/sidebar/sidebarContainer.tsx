"use client"

import { useSidebarStore } from "@//stores/sidebarStore";
import { ReactNode } from "react";

function SidebarContainer({ children }: { children: ReactNode }) {
  const sidebarStore = useSidebarStore();
  return (
    <div className="fixed top-0 left-0 z-50">
      <div className="hidden md:flex">
        {children}
      </div>
      <div className="lg:hidden fixed flex justify-between p-3 px-5 bg-white shadow-md w-full">
        <p className='text-2xl font-bold'>nexStore</p>
        <button onClick={() => sidebarStore.openSidebar()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div style={sidebarStore.isOpen ? { display: "flex" } : { display: "none" }} className="bg-black/10 backdrop-blur-xs w-full h-screen fixed top-0 left-0 transition-all duration-300"
        onClick={() => sidebarStore.closeSidebar()}>
        <button onClick={() => sidebarStore.closeSidebar()} className="fixed  top-5 right-5 bg-black text-white p-1 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        </button>
        <div style={sidebarStore.isOpen ? { translate: "0px" } : { translate: "-100%" }} className="transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SidebarContainer