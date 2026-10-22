import { useState , type FormEvent} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Signup() {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [error , setError] = useState("")

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError("")

        if (!name || !email || !password) {
            setError("همه فیلدها رو پر کنید")
            return
        }
        
        const result = signup(name , email ,password)
        if (!result.success) {
            setError(result.message ?? "ثبت نام ناموفق بود")
            return
        }

        navigate("/")
    }

    return(
        <div className="mx-auto max-w-sm px-6 px-16">
            <h1 className="mb-6 text-xl font-medium">ساخت حساب جدید</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
            type="text"
            placeholder="نام"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />

            <input 
            type="text"
            placeholder="ایمیل"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
             />

            <input 
            type="text"
            placeholder="رمزعبور"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
             />

            {error && <div className="text-xs text-red-600">{error}</div>}

            <button type="submit" className="mt-2 rounded-md bg-neutral-900 text-sm text-white">
                ثبت نام 
            </button>
            </form>

            <div className="mt-4 text-xs text-neutral-500">
                <Link to="/login">حساب کاربری دارید؟ وارد شوید</Link>
            </div>
        </div>
    )
}