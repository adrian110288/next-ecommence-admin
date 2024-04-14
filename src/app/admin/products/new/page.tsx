import PageHeader from "../../_components/PageHeader";
import ProductForm from "../_components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="flex flex-col w-full items-center">
      <PageHeader>Add Product</PageHeader>
      <ProductForm className="flex flex-col w-2/5" />
    </div>
  );
}
