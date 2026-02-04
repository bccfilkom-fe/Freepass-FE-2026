import { handleEditProduct } from "@//actions/productActions";
import { useCategories } from "@//hooks/useCategories";
import { useProductModalStore } from "@//stores/productModalStore";
import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import ErrText from "../../errText";
import { useToastStore } from "@//stores/ToastStore";

export default function EditProductModal() {
  const { data: categories, error: catError } = useCategories();
  const modalStore = useProductModalStore();
  const queryClient = useQueryClient();

  const [state, formAction, isLoading] = useActionState(handleEditProduct, {
    success: false,
    message: "",
    errors: {
      code: "",
      title: "",
      category_id: "",
      description: "",
      price: "",
      qty: "",
    },
    fields: {
      code: "",
      title: "",
      category_id: "",
      description: "",
      price: "",
      qty: "",
    }
  })

  const toastStore = useToastStore();

  useEffect(() => {
    if (state.message) toastStore.addToast(state.success, state.message);
    if (state.success) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      modalStore.closeModal();
    }
  }, [modalStore.closeModal, queryClient, state])

  if (!modalStore.openEditModal) return;

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 z-20 bg-black/10 backdrop-blur-xs shadow-sm h-screen w-screen" onClick={() => modalStore.closeModal()}>
      <div className="h-fit mx-auto w-9/10 sm:min-w-md sm:max-w-xl shadow-sm py-4 px-6 sm:px-10 bg-white rounded-xl" onClick={(e) => e.stopPropagation()}>
        <div className="my-3">
          <h1 className="text-center text-2xl font-bold text-gray-900 ">Edit Product</h1>
          <form action={formAction} key={modalStore.data?.category_id} className="flex flex-col mt-2 gap-2
          [&_label]:text-sm [&_label]:font-semibold [&_label]:capitalize
          [&_input,textarea,select]:w-full [&_input,textarea,select]:border [&_input,textarea,select]:outline-black/60 [&_input,textarea,select]:px-2 [&_input,textarea,select]:py-2 [&_input,textarea,select]:text-sm [&_input,textarea,select]:rounded-md [&_input,textarea,select]:bg-white
          ">
            <input readOnly value={modalStore.data?.id} type="text" name="id" className="hidden" id="id" />
            <div className="">
              <label htmlFor="code" className="">code</label>
              <input required defaultValue={modalStore.data?.code} type="text" name="code" className="" id="code" />
              {state.errors.code && <ErrText teks={state.errors.code}></ErrText>}
            </div>

            <div className="">
              <label htmlFor="title">Product Name</label>
              <input required defaultValue={modalStore.data?.title} type="text" name="title" id="title" />
              {state.errors.title && <ErrText teks={state.errors.title}></ErrText>}
            </div>

            <div className="flex flex-col">
              <div className="flex gap-5 mt-2 items-center">
                <label htmlFor="category_id" className="">Category</label>
                <div className="relative flex-1">
                  <select
                    name="category_id"
                    id="category_id"
                    className="appearance-none rounded-md px-4 py-2 pr-10 focus:outline-1 transition-all cursor-pointer"
                    defaultValue={modalStore.data?.category_id}
                  >
                    <option value=""></option>
                    {/* {categories ?
                    <> */}
                    {
                      categories?.map((cat, idx) => (
                        <option key={idx} value={cat.id}>{cat.name}</option>
                      ))
                    }
                    {/* </>
                    :
                    <p>tidak ada kategori</p>
                  } */}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-black/80">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
              {state.errors.category_id && <ErrText teks={state.errors.category_id}></ErrText>}
            </div>

            <div className="">
              <label htmlFor="description">Description</label>
              <textarea defaultValue={modalStore.data?.description} rows={4} name="description" id="description" className="resize-none" />
              {state.errors.description && <ErrText teks={state.errors.description}></ErrText>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="price">price</label>
                <input required defaultValue={modalStore.data?.price} type="number" min={0} name="price" id="price" className="no-spinner" />
                {state.errors.price && <ErrText teks={state.errors.price}></ErrText>}
              </div>
              <div className="flex-1">
                <label htmlFor="qty">quantity</label>
                <input readOnly defaultValue={modalStore.data?.qty} type="number" min={0} name="qty" id="qty" className="no-spinner read-only:bg-black/10 cursor-not-allowed" />
                {state.errors.qty && <ErrText teks={state.errors.qty}></ErrText>}
              </div>
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