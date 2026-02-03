"use client"

import Loading from "./loading";
import { useSearchParams } from "next/navigation";
import DropdownProduct from "@/components/ui/dropdownProduct";
import { useDeleteProduct, useProducts } from "@/hooks/useProducts";
import { product } from "@/types/product";
import CreateProductModal from "@/components/ui/modal/CreateProductModal";
import { useProductModalStore } from "@/stores/productModalStore";
import EditProductModal from "@/components/ui/modal/EditProductModal";

function ProductList() {
  const params = new URLSearchParams(useSearchParams())
  const category = params.get('category') || undefined;

  const productModalStore = useProductModalStore();
  const {mutate: delProduct, isPending} = useDeleteProduct();

  const { isLoading, data, isError, error } = useProducts(category);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <div className='mx-auto h-[80dvh] flex flex-col gap-3 items-center justify-center'>
    <p className='text-8xl font-extrabold mb-5'>OOPS</p>
    <h2>Something went wrong! {error.message}</h2>
  </div>;

  return (
    <>
      <EditProductModal></EditProductModal>
      <DropdownProduct></DropdownProduct>
      <div className="p-8 px-10 ">
        <div className="shadow-sm overflow-clip overflow-x-scroll no-scrollbar rounded-xl
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
                <th>sku</th>
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
                      <td className="sticky left-0 bg-white"><p>{item.title}</p></td>
                      <td><p>{item.code ?? "-"}</p></td>
                      <td><p>{item.nexstore_category?.name}</p></td>
                      <td><p>{item.qty}</p></td>
                      <td><p>{item.price}</p></td>
                      <td><p>{item.qty > 0 ? "Tersedia" : "Habis"}</p></td>
                      <td className="flex gap-2
                  [&_button]:bg-black [&_button]:text-white
                  ">
                        <button onClick={() => productModalStore.setOpenEditModal(item)}>edit</button>
                        <button onClick={() => delProduct(item.id || 0)}>
                          {isPending && productModalStore.data?.id === item.id ?
                            <p>Menghapus...</p>
                            :
                            <p>hapus</p>
                          }
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

export default ProductList