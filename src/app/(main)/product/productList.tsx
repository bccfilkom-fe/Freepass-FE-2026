"use client"

import Loading from "@//components/loading";
import { useSearchParams } from "next/navigation";
import { useDeleteProduct, useProducts } from "@//hooks/useProducts";
import { product } from "@//types/product";
import { useProductModalStore } from "@//stores/productModalStore";
import { useEffect } from "react";
import { useToastStore } from "@//stores/ToastStore";

function Product() {
  const params = new URLSearchParams(useSearchParams())
  const category = params.get('category') || undefined;

  const productModalStore = useProductModalStore();
  const { mutate: delProduct, isError: delIsError, isSuccess: delSuccess, error: delError, isPending: delIsPending } = useDeleteProduct();

  const toastStore = useToastStore();

  useEffect(() => {
    if (delIsError) toastStore.addToast(false, delError.message);
    if (delSuccess) toastStore.addToast(true, "Berhasil menghapus produk");
  }, [delIsPending])

  const { isLoading, data, isError, error } = useProducts(category);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <div className='mx-auto h-[80dvh] flex flex-col gap-3 items-center justify-center'>
    <p className='text-8xl font-extrabold mb-5'>OOPS</p>
    <h2>Something went wrong! {error.message}</h2>
  </div>;

  return (
    <>
      <div className="px-6 lg:px-10">
        <div className="shadow-sm overflow-clip overflow-x-auto  rounded-xl
        [&_p]:line-clamp-1
        ">
          <table className="w-full min-w-fit
          [&_thead]:bg-gray-300
        [&_th,td]:px-6 [&_td]:py-3 [&_th]:py-4 [&_th]:capitalize [&_th,td]:text-left 
        [&_tbody]:divide-y [&_tbody]:divide-black/20
        [&_td]:text-sm [&_td]:group-hover:bg-black/5
        
        ">
            <thead>
              <tr>
                <th className="sticky left-0 bg-gray-300">produk</th>
                <th>code</th>
                <th>kategori</th>
                <th>stok</th>
                <th>harga</th>
                <th>status</th>
                <th>aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.length === 0 || !data ?
                <tr className="group">
                  <td colSpan={7} className="text-center py-6! hover:bg-white!">
                    <p className="text-center opacity-40">tidak ada data</p>
                  </td>
                </tr>
                :
                <>
                  {data.map((item: product) => (
                    <tr key={item.id} className="group">
                      <td className="sticky left-0 bg-gray-100 lg:bg-white"><p>{item.title}</p></td>
                      <td><p>{item.code ?? "-"}</p></td>
                      <td><p>{item.nexstore_category?.name}</p></td>
                      <td><p>{item.qty}</p></td>
                      <td><p>{item.price}</p></td>
                      <td><p>{item.qty > 0 ? "Tersedia" : "Habis"}</p></td>
                      <td className="flex
                  [&_button]:rounded-md [&_button]:text-white
                  ">
                        <button className="mr-3 p-1.5 cursor-pointer bg-green-700" onClick={() => productModalStore.setOpenEditModal(item)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button onClick={() => delProduct(Number(item.id))} className="bg-red-700 p-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Product