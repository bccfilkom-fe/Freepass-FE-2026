import EditProductModal from "@//components/ui/modal/EditProductModal";
import DropdownProduct from "@//components/ui/dropdownProduct";
import { Suspense } from "react";
import ProductList from "./ProductList";

function page() {
  return (
    <>
      <EditProductModal></EditProductModal>
      <Suspense>
        <DropdownProduct></DropdownProduct>
      </Suspense>
      <Suspense>
        <ProductList></ProductList>
      </Suspense>
    </>
  )
}

export default page