"use client"
import { handleCreateCategory } from "@//actions/categoryActions";
import { useCategoryModalStore } from "@//stores/CategoryModalStore";
import { useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ErrText from "@//components/errText";
import { useToastStore } from "@//stores/ToastStore";

export default function CreateCategoryModal() {

  const modalStore = useCategoryModalStore();

  const openModal = useCategoryModalStore().openCreate;
  const closeModal = useCategoryModalStore().closeModal;

  const [state, formAction, isPending] = useActionState(handleCreateCategory, {
    success: false,
    message: "",
    catError: "",
    descError: "",
    fields: {
      name: "",
      description: null
    }
  })

  const queryClient = useQueryClient();

  const toastStore = useToastStore();

  useEffect(() => {
    if (state.message) toastStore.addToast(state.success, state.message);
    if (state.success) {
      closeModal()
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    };
  }, [openModal, closeModal, state, queryClient])

  if (!modalStore.isOpen || modalStore.type !== "create") return;

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 z-50 bg-black/10 backdrop-blur-xs shadow-sm h-screen w-screen" onClick={() => modalStore.closeModal()}>
      <div className="h-fit mx-auto w-9/10 sm:min-w-md sm:max-w-xl shadow-sm py-4 px-6 sm:px-10 bg-white rounded-xl" onClick={(e) => e.stopPropagation()}>
        <div className="my-3">
          <h1 className="text-center text-2xl font-bold text-gray-900">Create New Category</h1>
          <form action={formAction} className="flex flex-col mt-4 gap-2
          [&_label]:text-sm [&_label]:font-semibold [&_label]:capitalize
          [&_input,textarea,select]:w-full [&_input,textarea,select]:border [&_input,textarea,select]:outline-black/60 [&_input,textarea,select]:px-2 [&_input,textarea,select]:py-2 [&_input,textarea,select]:text-sm [&_input,textarea,select]:rounded-md [&_input,textarea,select]:bg-white
          ">
            <div className="">
              <label htmlFor="name">Category Name</label>
              <input type="text" name="name" id="name" required placeholder="name"
                defaultValue={state.fields.name}
              />
              {state.catError && <ErrText teks={state.catError}></ErrText>}
            </div>

            <div className="">
              <label htmlFor="description">Description</label>
              <textarea rows={5} maxLength={200} name="description" id="description" placeholder="description" className="resize-none"
                defaultValue={state.fields.description || ""}
              />
              {state.descError && <ErrText teks={state.descError}></ErrText>}
            </div>

            <div className="flex gap-4 mt-2
            [&_button]:mt-4 [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-xl [&_button]:w-full [&_button]:cursor-pointer
            ">
              <button type="button" className="bg-black/30 text-white text-sm sm:text-base" onClick={() => modalStore.closeModal()}>back</button>
              <button type="submit" className="bg-black text-white text-sm sm:text-base">
                {isPending ? "Memproses..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}