import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"

export function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="mb-6 text-xl font-medium">بازیابی رمز عبور</h1>

      {sent ? (
        <p className="text-sm text-neutral-600">
          اگه این ایمیل تو سیستم ثبت شده باشه، لینک بازیابی براش ارسال میشه.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
          <button type="submit" className="mt-2 rounded-md bg-neutral-900 py-2 text-sm text-white">
            ارسال لینک بازیابی
          </button>
        </form>
      )}

      <div className="mt-4 text-xs text-neutral-500">
        <Link to="/login">بازگشت به ورود</Link>
      </div>
    </div>
  )
}
