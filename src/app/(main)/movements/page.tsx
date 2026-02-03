"use client"
import CreateMovementModal from "@/components/ui/modal/CreateMovementModal";
import { useDeleteMovement, useMovements } from "@/hooks/useMovements";
import { useMovementModalStore } from "@/stores/MovementsModalStore";
import { movement } from "@/types/movements";
import Loading from "../product/loading";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Movements() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const type = searchParams.get("type");

  const { isLoading, data, error } = useMovements(type);
  const modalStore = useMovementModalStore();
  const { mutate: delMvm, isPending: delPending, variables: delId } = useDeleteMovement();

  if (isLoading) return <Loading></Loading>

  return (
    <>
      <CreateMovementModal></CreateMovementModal>
      <div className="flex m-6 mx-10 p-3 rounded-2xl justify-between shadow-sm border-black/10 border">
        <div className="flex items-center">
          <div className="flex gap-4
              [&_label]:relative [&_label]:flex [&_label]:w-fit [&_label]:cursor-pointer [&_label]:items-center [&_label]:justify-center [&_label]:rounded-lg [&_label]:border-2 [&_label]:border-black/10 [&_label]:px-4 [&_label]:p-2 [&_label]:hover:bg-black/5 [&_label]:has-checked:border-black/40 [&_label]:has-checked:bg-black/5 [&_label]:transition-all">
            <label className="" onClick={() => {
              params.delete("type");
              router.push(`${pathname}?${params}`)
            }}>
              <input type="radio" name="type" value="" className="sr-only" checked={params.get("type") === null} readOnly/>
              <span className="text-sm font-semibold">Semua</span>
            </label>

            <label className="" onClick={() => {
              params.set("type", "IN");
              router.push(`${pathname}?${params}`);
            }}>
              <input type="radio" name="type" value="IN" className="sr-only" checked={params.get("type") === "IN"} readOnly/>
              <span className="text-sm font-semibold">Masuk</span>
            </label>

            <label className="" onClick={() => {
              params.set("type", "OUT");
              router.push(`${pathname}?${params}`);
            }}>
              <input type="radio" name="type" value="OUT" className="sr-only" checked={params.get("type") === "OUT"} readOnly/>
              <span className="text-sm font-semibold">Keluar</span>
            </label>
          </div>

          {/* {state.errors.type && <ErrText teks={state.errors.type} />} */}
        </div>
        <button className="bg-black text-white p-2 px-4 rounded-full cursor-pointer" onClick={() => modalStore.openCreate()}>tambah data</button>
      </div>
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

export default Movements