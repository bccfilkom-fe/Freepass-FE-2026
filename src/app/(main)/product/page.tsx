import EditProductModal from "@//components/ui/modal/EditProductModal";
import DropdownProduct from "@//components/ui/dropdownProduct";
import { Suspense } from "react";
import Product from "./productList";

function page() {
  return (
    <>
      <EditProductModal></EditProductModal>
      <DropdownProduct></DropdownProduct>
      <Suspense>
        <Product></Product>
      </Suspense>
    </>
  )
}

export default page