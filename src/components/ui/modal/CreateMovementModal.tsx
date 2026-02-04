import { handleCreateMovement } from "@//actions/movementActions";
import ErrText from "@//components/errText";
import { useProducts } from "@//hooks/useProducts";
import { useMovementModalStore } from "@//stores/MovementsModalStore";
import { useToastStore } from "@//stores/ToastStore";
import { product } from "@//types/product";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";

export default function CreateMovementModal() {
  const { data: products } = useProducts();
  const modalStore = useMovementModalStore();
  const queryClient = useQueryClient();

  const [state, formAction, isLoading] = useActionState(handleCreateMovement, {
    success: false,
    message: "",
    errors: {
      product_id: "",
      type: "",
      quantity: "",
      note: "",
    },
    fields: {
      product_id: "",
      type: "",
      quantity: "",
      note: null,
    }
  })

  const toastStore = useToastStore();

  useEffect(() => {
    if (state.message) toastStore.addToast(state.success, state.message);
    if (state.success) {
      queryClient.invalidateQueries({ queryKey: ["movements"] });
      modalStore.closeModal();
    }
  }, [state, queryClient])

  if (!modalStore.isOpen || modalStore.type !== "create") return;

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 z-20 bg-black/10 backdrop-blur-xs shadow-sm h-screen w-screen" onClick={() => modalStore.closeModal()}>
      <div className="h-fit mx-auto w-9/10 sm:min-w-md sm:max-w-xl shadow-sm py-4 px-6 sm:px-10 bg-white rounded-xl" onClick={(e) => e.stopPropagation()}>
        <div className="my-3">
          <h1 className="text-center text-2xl font-bold text-gray-900 ">Create New Movement Data</h1>
          <form action={formAction} key={state.fields.product_id} className="flex flex-col mt-2 gap-3
          [&_label]:text-sm [&_label]:w-30 [&_label]:font-semibold [&_label]:capitalize
          [&_input,textarea,select]:w-full [&_input,textarea,select]:border [&_input,textarea,select]:outline-black/60 [&_input,textarea,select]:px-2 [&_input,textarea,select]:py-2 [&_input,textarea,select]:text-sm [&_input,textarea,select]:rounded-md [&_input,textarea,select]:bg-white
          ">
            <div className="flex flex-col">
              <div className="flex mt-2 items-center">
                <label htmlFor="product_id" className="">Pilih produk</label>
                <div className="relative flex-1">
                  <select
                    name="product_id"
                    id="product_id"
                    className="appearance-none rounded-md px-4 py-2 pr-10 focus:outline-1 transition-all cursor-pointer"
                    defaultValue={state.fields.product_id}
                  >
                    {
                      products?.map((prod: product, idx: number) => (
                        <option key={idx} value={prod.id}>{prod.title}</option>
                      ))
                    }
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-black/80">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              {state.errors.product_id && <ErrText teks={state.errors.product_id}></ErrText>}
            </div>

            <div className="flex items-center">
              <label className="">Jenis</label>
              <div className="flex gap-4
              [&_label]:relative [&_label]:flex [&_label]:w-fit [&_label]:cursor-pointer [&_label]:items-center [&_label]:justify-center [&_label]:rounded-lg [&_label]:border-2 [&_label]:border-black/10 [&_label]:px-4 [&_label]:p-2 [&_label]:hover:bg-black/5 [&_label]:has-checked:border-black/40 [&_label]:has-checked:bg-black/5 [&_label]:transition-all">
                <label className="">
                  <input type="radio" name="type" value="IN" className="sr-only" />
                  <span className="text-sm font-semibold">Masuk</span>
                </label>

                <label className="">
                  <input type="radio" name="type" value="OUT" className="sr-only" />
                  <span className="text-sm font-semibold">Keluar</span>
                </label>
              </div>

              {state.errors.type && <ErrText teks={state.errors.type} />}
            </div>

            <div className="flex items-center">
              <label htmlFor="quantity" className="">Jumlah</label>
              <div className="flex-1">
                <input required type="number" name="quantity" id="quantity" className="no-spinner flex-1" min={0} />
                {state.errors.quantity && <ErrText teks={state.errors.quantity}></ErrText>}
              </div>
            </div>

            <div className="">
              <label htmlFor="note">Catatan</label>
              <textarea defaultValue={state.fields.note ?? ""} rows={4} name="note" id="note" className="resize-none" />
              {state.errors.note && <ErrText teks={state.errors.note}></ErrText>}
            </div>

            <div className="flex gap-4 mt-4
            [&_button]:mt-4 [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-xl [&_button]:w-full [&_button]:cursor-pointer
            ">
              <button className="bg-black/30 text-white text-sm sm:text-base" onClick={() => modalStore.closeModal()}>back</button>
              <button type="submit" className="bg-black text-white text-sm sm:text-base disabled:opacity-50"
                disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Save"}
              </button>
            </div>
            {/* {state.message &&
              <>
                {state.success ?
                  <p>{state.message}</p>
                  :
                  <ErrText teks={state.message}></ErrText>
                }
              </>
            } */}
          </form>
        </div>
      </div>
    </div>
  )
}