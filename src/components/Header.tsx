import { Link } from "react-router-dom"
import { User, ShoppingBag, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
      <Link to="/" className="text-lg font-medium">
        Luxe<span className="text-neutral-500">.</span>
      </Link>

      <nav className="hidden gap-6 text-sm text-neutral-600 md:flex">
        <Link to="/shop">محصولات</Link>
        <Link to="/shop">کالکشن‌ها</Link>
        <Link to="/shop">درباره ما</Link>
        <Link to="/shop">تماس با ما</Link>
      </nav>

      <div className="flex items-center gap-4">
        {!isLoading &&
          (isAuthenticated ? (
            <>
              <span className="text-sm text-neutral-600">{user?.name}</span>
              <button onClick={logout} aria-label="خروج">
                <LogOut size={20} strokeWidth={1.5} />
              </button>
            </>
          ) : (
            <Link to="/login" aria-label="ورود">
              <User size={20} strokeWidth={1.5} />
            </Link>
          ))}

        <Link to="/checkout" aria-label="سبد خرید">
          <ShoppingBag size={20} strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  )
}