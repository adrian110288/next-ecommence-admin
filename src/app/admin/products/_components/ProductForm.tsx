"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import {addProduct, updateProduct} from "../../_actions/products";
import {useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductForm({ product, className }: { product?: Product | null, className: string }) {
  
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  )
  const [priceInCents, setPriceInCents] = useState<number|undefined>(product?.priceInCents);

  return (
    <div className={className}>
      <form action={action} className="space-y-8 w-full">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" defaultValue={product?.name || ""} />
          {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price In Cents</Label>
          <Input
            type="number"
            id="priceInCents"
            name="priceInCents"
            required
            value={priceInCents}
            min={0}
            onChange={(e) =>
              setPriceInCents(Number(e.target.value || undefined))
            }
          />
          {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={product?.description || ""} />
          {error.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input type="file" id="file" name="file" required={product == null} />
          {error.file && <div className="text-destructive">{error.file}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" required={product == null} />
          {error.image && <div className="text-destructive">{error.image}</div>}
          {product != null && <Image src={product.imagePath} height="400" width="400" alt="Product image"/>}
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}