"use client"
import { useCategories, useDeleteCategories } from "@//hooks/useCategories"
import { category } from "@//types/categories";
import { useCategoryModalStore } from "@//stores/CategoryModalStore";
import CreateCategoryModal from "@//components/ui/modal/CreateCategoryModal";
import EditCategoryModal from "@//components/ui/modal/EditCategoryModal";
import { useToastStore } from "@//stores/ToastStore";
import Loading from "../product/loading";
import { useEffect } from "react";

function Categories() {
  const modalStore = useCategoryModalStore();

  const { isLoading, data, error } = useCategories();
  const { mutate: deleteCat, isPending: pendingCat, variables: delId, isSuccess: delSuccess, isError, error: delError } = useDeleteCategories();

  const toastStore = useToastStore();

  useEffect(() => {
    if (delSuccess) toastStore.addToast(true, "Berhasil menghapus kategori");
  }, [pendingCat])

  if (isLoading) return <Loading></Loading>;

  if (error) return <div className='mx-auto h-[80dvh] flex flex-col gap-3 items-center justify-center'>
    <p className='text-8xl font-extrabold mb-5'>OOPS</p>
    <h2>Something went wrong! {error?.message}</h2>
  </div>;

  return (
    <>
      <CreateCategoryModal></CreateCategoryModal>
      <EditCategoryModal></EditCategoryModal>
      <div className="fixed bottom-10 right-0 flex m-6 lg:mx-10 md:p-3 md:px-6 items-center rounded-2xl justify-end md:shadow-sm md:border-black/10 md:border [&_p]:lg:text-lg [&_p]:font-bold md:sticky md:top-0 md:bg-white z-10">
        <button className="bg-black text-white p-3 md:p-2 md:px-4 rounded-full cursor-pointer flex items-center gap-2" onClick={() => modalStore.openCreate()}>
          <span className="hidden md:flex lg:text-base">tambah kategori</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8 lg:size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <div className="px-6 lg:px-10">
        <div className="shadow-sm overflow-clip overflow-x-auto  rounded-xl
        [&_p]:line-clamp-1
        ">
          <table className="w-full min-w-fit
          [&_thead]:bg-gray-300
        [&_th,td]:px-6 [&_td]:py-2 [&_th]:py-4 [&_th]:capitalize [&_th,td]:text-left 
        [&_tbody]:divide-y [&_tbody]:divide-black/20
        [&_td]:text-sm [&_td]:group-hover:bg-black/5
        ">
            <thead>
              <tr>
                <th className="sticky left-0 bg-gray-300">nama</th>
                <th>deskripsi</th>
                <th>aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.length === 0 || !data ?
                <tr className="group">
                  <td colSpan={2} className="text-center py-6! hover:bg-white!">
                    <p className="text-center opacity-40">tidak ada data</p>
                  </td>
                </tr>
                :
                <>
                  {data.map((item: category) => (
                    <tr key={item.id} className="group">
                      <td className="sticky left-0 bg-gray-100 lg:bg-white"><p>{item.name}</p></td>
                      <td><p>{item.description ?? "-"}</p></td>
                      <td className="flex
                  [&_button]:rounded-md [&_button]:text-white
                  ">
                        <button className="mr-3 p-1.5 cursor-pointer bg-green-700" onClick={() => modalStore.openEdit(item)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button onClick={() => deleteCat(item.id)} className="bg-red-700 p-1.5 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                  }
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Categories