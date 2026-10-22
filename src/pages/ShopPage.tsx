import {Card} from "../components/Card"
import type { Product } from "../types/product"

const products: Product[] = [
  { id: "1", name: "پیراهن کتان", price: 850000, image: "/products/Shirt.jfif" },
  { id: "2", name: "کفش چرم", price: 1200000, image: "/products/shoe.jpg" },
  { id: "3", name: "ساعت مینیمال", price: 2100000, image: "/products/Watch.jpg" },
  { id: "4", name: "کیف دستی", price: 950000, image: "/products/bag.webp" },
  { id: "5", name: "عینک آفتابی", price: 650000, image: "/products/glasses.jpg" },
  { id: "6", name: "هودی", price: 720000, image: "/products/hoodie.jpg" },
]

export function ShopPage() {
  function handleAddToCart(product: Product) {
    // فعلاً فقط لاگ می‌گیریم؛ بعداً به cart-context وصل می‌شه
    console.log("افزودن به سبد:", product)
  }

  return (
    <div>
      <section className="w-full bg-amber-100 px-8 py-12 text-center">
      <div className="text-sm text-amber-800">کالکشن پاییزی</div>
      <h1 className="mt-2 text-2xl font-medium">سبک زندگی، با ظرافت</h1>
      <p className="mt-2 text-sm text-amber-900">جدیدترین محصولات رو همین حالا ببین</p>
        <button className="mt-4 rounded-md bg-neutral-900 px-6 py-2 text-sm text-white">
          مشاهده محصولات
        </button>
      </section>

      <section className="px-6 py-6">
        <h2 className="mb-4 text-base font-medium">محصولات جدید</h2>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  )
}
