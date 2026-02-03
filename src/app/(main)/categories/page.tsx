"use client"
import { useCategories, useDeleteCategories } from "@//hooks/useCategories"
import { category } from "@//types/categories";
import { useCategoryModalStore } from "@//stores/CategoryModalStore";
import CreateCategoryModal from "@//components/ui/modal/CreateCategoryModal";
import EditCategoryModal from "@//components/ui/modal/EditCategoryModal";

function Categories() {
  const modalStore = useCategoryModalStore();

  const { isLoading, data, error } = useCategories();
  const { mutate: deleteCat, isPending: pendingCat, variables: delId, isSuccess: delSuccess } = useDeleteCategories();

  // if (isLoading) return <Lo></Loading>;

  if (error) return <div className='mx-auto h-[80dvh] flex flex-col gap-3 items-center justify-center'>
    <p className='text-8xl font-extrabold mb-5'>OOPS</p>
    <h2>Something went wrong! {error?.message}</h2>
  </div>;

  return (
    <>
      <CreateCategoryModal></CreateCategoryModal>
      <EditCategoryModal></EditCategoryModal>
      <button className="bg-black text-white p-2 px-4 mx-10 mt-10 rounded-full cursor-pointer" onClick={() => modalStore.openCreate()}>tambah kategori</button>
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
                      <td className="sticky left-0 bg-white"><p>{item.name}</p></td>
                      <td><p>{item.description ?? "-"}</p></td>
                      <td className="w-50
                  [&_button]:bg-black [&_button]:text-white
                  ">
                        <button className="mr-3 p-2 cursor-pointer" onClick={() => modalStore.openEdit(item)}>edit</button>
                        <button onClick={() => deleteCat(item.id)}>
                          {pendingCat && delId === item.id ? "Menghapus..." : "hapus"}
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