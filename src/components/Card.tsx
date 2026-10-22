import type { Product } from "../types/product"

type CardProps = {
    product: Product
    onAddToCart?: (product: Product) => void
}

export function Card({ product, onAddToCart }: CardProps) {
    return(
         <div className="rounded-xl border border-neutral-200 p-3">
      <div className="flex h-32 items-center justify-center rounded-lg bg-neutral-100">
        <img src={product.image} alt={product.name} className="h-full w-full rounded-lg object-contain" />
      </div>
      <div className="mt-2 text-sm">{product.name}</div>
      <div className="text-sm font-medium text-neutral-700">
        {product.price.toLocaleString("fa-IR")} تومان
      </div>
      <button
        onClick={() => onAddToCart?.(product)}
        className="mt-2 w-full rounded-md border border-neutral-300 py-1.5 text-xs hover:bg-neutral-50 cursor-pointer"
      >
        افزودن به سبد
      </button>
    </div>
    )
}