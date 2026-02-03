"use client"
import { useSearchParams } from "next/navigation";
import { movement } from "@//types/movements";
import { useDeleteMovement, useMovements } from "@//hooks/useMovements";
import { useMovementModalStore } from "@//stores/MovementsModalStore";
import Loading from "../product/loading";
import { Suspense } from "react";

function MovementList() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const { isLoading, data, error } = useMovements(type);

  const modalStore = useMovementModalStore();
  const { mutate: delMvm, isPending: delPending, variables: delId } = useDeleteMovement();

  if (isLoading) return <Loading></Loading>

  return (
    <>
      <div className="px-10">
        <div className="shadow-sm overflow-clip overflow-x-scroll no-scrollbar rounded-xl
            [&_p]:line-clamp-2
            ">
          <table className="w-full min-w-fit
              [&_thead]:bg-gray-300
            [&_th,td]:px-6 [&_td]:py-3 [&_th]:py-4 [&_th]:capitalize [&_th,td]:text-left 
            [&_tbody]:divide-y [&_tbody]:divide-black/20
            [&_td]:text-sm [&_td]:group-hover:bg-black/5
            
            ">
            <thead>
              <tr>
                <th className="sticky left-0 bg-gray-300">Tanggal & waktu</th>
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
                      <td className="sticky left-0 bg-white"><p>{item.created_at?.substring(0, 10).concat(", " + item.created_at?.substring(11, 19))}</p></td>
                      <td><p>{item.nexstore_product?.title ?? "-"}</p></td>
                      <td><p>{item.nexstore_product?.code ?? "-"}</p></td>
                      <td><p>{item.type}</p></td>
                      <td><p>{item.quantity}</p></td>
                      <td><p>{item.note}</p></td>
                      <td className="w-50
                      [&_button]:bg-black [&_button]:text-white
                      ">
                        <button className="mr-3 p-2 cursor-pointer" onClick={() => modalStore.openEdit(item)}>edit</button>
                        <button onClick={() => delMvm(Number(item.id))}>
                          {delPending && delId === item.id ? "Menghapus..." : "hapus"}
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