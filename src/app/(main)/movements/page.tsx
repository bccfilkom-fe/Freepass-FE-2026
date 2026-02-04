"use client"
import CreateMovementModal from "@//components/ui/modal/CreateMovementModal";
import { useMovementModalStore } from "@//stores/MovementsModalStore";
import FilterBtns from "./filterBtns";
import MovementList from "./movementList";
import { Suspense } from "react";
import EditMovementModal from "@//components/ui/modal/EditMovementModal";

function Movements() {
  const modalStore = useMovementModalStore();

  return (
    <>
      <CreateMovementModal></CreateMovementModal>
      <EditMovementModal></EditMovementModal>
      <div className="flex flex-col lg:flex-row gap-3 m-6 mx-10 p-3 rounded-2xl justify-between shadow-sm border-black/10 border sticky top-0 bg-white z-10">
        <div className="flex gap-4
              [&_label]:relative [&_label]:flex [&_label]:flex-1 [&_label]:lg:w-fit [&_label]:cursor-pointer [&_label]:items-center [&_label]:justify-center [&_label]:rounded-lg [&_label]:border-2 [&_label]:border-black/10 [&_label]:px-4 [&_label]:p-2 [&_label]:hover:bg-black/5 [&_label]:has-checked:border-black/40 [&_label]:has-checked:bg-black/5 [&_label]:transition-all">
          <Suspense>
            <FilterBtns></FilterBtns>
          </Suspense>
        </div>
        <button className="bg-black text-white p-2 px-4 rounded-full cursor-pointer flex gap-2 items-center justify-center" onClick={() => modalStore.openCreate()}>
          <span className="lg:text-base">tambah movement</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 lg:size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

        </button>
      </div>
      <Suspense>
        <MovementList></MovementList>
      </Suspense>
    </>
  )
}

export default Movements