import { useState, type FormEvent } from "react";

type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
}

const cartItems: CartItem[] = [
  { id: "1", name: "پیراهن کتان", price: 850000, quantity: 1 },
  { id: "3", name: "ساعت مینیمال", price: 2100000, quantity: 1 },
]

export function Checkout() {
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError("")

        if (!address || !phone) {
            setError("آدرس و شماره تماس را وارد کن")
            return
        }
    }
      return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-xl font-medium">تسویه حساب</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="آدرس تحویل"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
          <input
            type="tel"
            placeholder="شماره تماس"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />

          {error && <div className="text-xs text-red-600">{error}</div>}

          <button type="submit" className="mt-2 rounded-md bg-neutral-900 py-2 text-sm text-white">
            ثبت سفارش
          </button>
        </form>

        <div className="rounded-xl border border-neutral-200 p-4">
          <h2 className="mb-3 text-sm font-medium">خلاصه سفارش</h2>
          <div className="flex flex-col gap-2 text-sm">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-neutral-600">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toLocaleString("fa-IR")} تومان</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 text-sm font-medium">
            <span>جمع کل</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </div>
        </div>
      </div>
    </div>
  )
}