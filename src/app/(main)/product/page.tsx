"use client"
import EditProductModal from "@//components/ui/modal/EditProductModal";
import DropdownProduct from "@//components/ui/dropdownProduct";
import { Suspense } from "react";

function page() {
  return (
    <>
      <EditProductModal></EditProductModal>
      <DropdownProduct></DropdownProduct>
      <Suspense>
      </Suspense>
    </>
  )
}

export default page