"use client"
import { useSearchParams } from "next/navigation";
import { movement } from "@//types/movements";
import { useDeleteMovement, useMovements } from "@//hooks/useMovements";
import { useMovementModalStore } from "@//stores/MovementsModalStore";
import Loading from "@//components/loading";
import { useToastStore } from "@//stores/ToastStore";
import { useEffect } from "react";

function MovementList() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const { isLoading, data, error } = useMovements(type);

  const modalStore = useMovementModalStore();
  const { mutate: delMvm, isPending: delPending, variables: delId, isError: delIsError, isSuccess: delSuccess, error: delError } = useDeleteMovement();

  const toastStore = useToastStore();

  useEffect(() => {
    if (delIsError) toastStore.addToast(false, delError.message);
    if (delSuccess) toastStore.addToast(true, "Berhasil menghapus produk");
  }, [delPending])

  if (isLoading) return <Loading></Loading>

  return (
    <>
      <div className="px-6 lg:px-10">
        <div className="shadow-sm overflow-clip overflow-x-auto  rounded-xl
            ">
          <table className="w-full min-w-fit
              [&_thead]:bg-gray-300
            [&_th,td]:px-4 [&_th,td]:lg:px-6 [&_td]:lg:py-3 [&_td]:py-2 [&_th]:py-4 [&_th]:capitalize [&_th,td]:text-left 
            [&_tbody]:divide-y [&_tbody]:divide-black/20
            [&_td]:text-sm [&_td]:group-hover:bg-black/5
            [&_p]:whitespace-nowrap
            ">
            <thead>
              <tr>
                <th className="">Tanggal & waktu</th>
                <th>produk</th>
                <th>code</th>
                <th>tipe</th>
                <th>jumlah</th>
                <th>catatan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.length === 0 || !data ?
                <tr className="group">
                  <td colSpan={6} className="text-center py-6! hover:bg-white!">
                    <p className="text-center opacity-40">tidak ada data</p>
                  </td>
                </tr>
                :
                <>
                  {data.map((item: movement) => (
                    <tr key={item.id} className="group">
                      <td className=""><p>{item.created_at?.substring(0, 10).concat(", " + item.created_at?.substring(11, 19))}</p></td>
                      <td><p>{item.nexstore_product?.title ?? "-"}</p></td>
                      <td><p>{item.nexstore_product?.code ?? "-"}</p></td>
                      <td><p>{item.type}</p></td>
                      <td><p>{item.quantity}</p></td>
                      <td><p>{item.note}</p></td>
                      <td className="flex
                  [&_button]:rounded-md [&_button]:text-white
                  ">
                        <button className="mr-3 p-1.5 cursor-pointer bg-green-700" onClick={() => modalStore.openEdit(item)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button onClick={() => delMvm(Number(item.id))} className="bg-red-700 p-1.5 cursor-pointer">
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

export default MovementList