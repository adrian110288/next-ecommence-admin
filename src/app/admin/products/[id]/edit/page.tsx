import db from "@/db/db";
import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";

export default async function EditProductPage({ params: { id }} : {
    params: { id: string }
}) {
    
    const product = await db.product.findUnique({where: {id}})
    
    return (
        <div className="flex flex-col w-full items-center">
            <PageHeader>Edit Product</PageHeader>
            <ProductForm product={product} className="flex flex-col w-2/5" />
        </div>
    );
}
