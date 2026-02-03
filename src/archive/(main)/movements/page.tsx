"use client"
import CreateMovementModal from "@/components/ui/modal/CreateMovementModal";
import { useMovementModalStore } from "@/stores/MovementsModalStore";
import FilterBtns from "./filterBtns";
import MovementList from "./movementList";
import Loading from "../product/loading";
import { Suspense } from "react";

function Movements() {
  const modalStore = useMovementModalStore();

  return (
    <>
      <CreateMovementModal></CreateMovementModal>
      <div className="flex m-6 mx-10 p-3 rounded-2xl justify-between shadow-sm border-black/10 border">
        <div className="flex items-center">
          <div className="flex gap-4
              [&_label]:relative [&_label]:flex [&_label]:w-fit [&_label]:cursor-pointer [&_label]:items-center [&_label]:justify-center [&_label]:rounded-lg [&_label]:border-2 [&_label]:border-black/10 [&_label]:px-4 [&_label]:p-2 [&_label]:hover:bg-black/5 [&_label]:has-checked:border-black/40 [&_label]:has-checked:bg-black/5 [&_label]:transition-all">
            <Suspense>
              <FilterBtns></FilterBtns>
            </Suspense>
          </div>
        </div>
        <button className="bg-black text-white p-2 px-4 rounded-full cursor-pointer" onClick={() => modalStore.openCreate()}>tambah data</button>
      </div>
      <Suspense>
        <MovementList></MovementList>
      </Suspense>
    </>
  )
}

export default Movements