import CreateCategoryModal from "@//components/ui/modal/CreateCategoryModal";
import EditCategoryModal from "@//components/ui/modal/EditCategoryModal";
import Categories from "./CategoryList";

function page() {
  return (
    <>
      <CreateCategoryModal></CreateCategoryModal>
      <EditCategoryModal></EditCategoryModal>
      <Categories></Categories>
    </>
  )
}

export default page