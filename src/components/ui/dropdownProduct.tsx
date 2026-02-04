"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
// import SerachBar from '../searchBar';
import { useCategories } from '@//hooks/useCategories';
import { useProductModalStore } from '@//stores/productModalStore';
import CreateProductModal from './modal/CreateProductModal';


const DropdownProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const category = searchParams.get('category');

  const [openDropdown, setOpenDropdown] = useState<string>("");
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? "" : name);
  };

  const { data: categories, isError, isLoading } = useCategories();

  const modalStore = useProductModalStore();

  return (
    <>
      <CreateProductModal></CreateProductModal>
      <div className="flex m-6 mx-10 p-3 px-6 items-center rounded-2xl justify-between shadow-sm border-black/10 border [&_p]:lg:text-lg [&_p]:font-bold sticky top-0 bg-white z-10">
        <div className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => toggleDropdown('category')}
          >
            <div className="flex">
              <p className="font-medium">category</p>
              {category &&
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-black rounded-full"></div>
              }
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`z-10 size-4 transition-transform ${openDropdown === 'category' ? 'rotate-180 duration-200' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {openDropdown === 'category' && categories && (
            <>
              <div className="w-screen h-screen fixed top-0 left-0" onClick={() => setOpenDropdown("")}></div>
              <div className="absolute left-0 mt-2 min-w-48 bg-white border border-black/10 rounded-md shadow-lg z-10">
                <div className="py-1">
                  {categories.map((item) => {
                    return (
                      <button key={item.id} className={`${category === item.name ? "bg-gray-100" : ""} px-4 py-2 hover:bg-gray-100 group cursor-pointer text-sm text-gray-700 w-full flex justify-between`}
                        onClick={() => {
                          if (category === item.name) params.delete('category', item.name);
                          else params.set('category', item.name);
                          toggleDropdown("");
                          router.push(`${pathname}?${params.toString()}`)
                        }}
                      >
                        {item.name}
                        <span className={`invisible ${category === item.name && "visible lg:invisible lg:group-hover:visible"}`}>✕</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        {/* <SerachBar></SerachBar> */}
        <button className='border-2 px-4 py-1 cursor-pointer rounded-full' onClick={() => modalStore.setOpenCreateModal()}>
          tambah produk
        </button>
      </div>
    </>
  );
};

export default DropdownProduct;