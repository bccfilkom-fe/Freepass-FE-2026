"use client";

import { useToastStore } from "../stores/ToastStore";

export default function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-10 lg:bottom-5 right-5 z-100 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center p-3 min-w-xs border-l-5 rounded shadow-lg transition-all animate-in slide-in-from-right-full ${toast.success ?
            "bg-white border-green-600 text-gray-800"
            :
            "bg-white border-red-600 text-gray-800"
            }`}
        >
          <span className="mr-2">
            {toast.success ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            }
          </span>
          <p className="text-sm font-medium flex-1">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}