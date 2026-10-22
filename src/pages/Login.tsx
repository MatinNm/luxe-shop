import { useState , type FormEvent } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("ایمیل و پسورد را وارد کنید")
            return
        }

        const result = login(email, password)
        if (!result.success) {
            setError(result.message ?? "ورود ناموفق بود")
            return
        }

        navigate("/")
    }

    return(
        <div className=" border w-200 h-120 mx-auto max-w-sm px-6 py-16">
            <h1 className="mb-6 text-xl font-medium">ورود به حساب</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input 
                    type="text"
                    placeholder="ایمیل"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} 
                    className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                    />
                    <input 
                    type="text"
                    placeholder="رمز عبور"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} 
                    className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
                    />

                    {error && <div className="text-xs text-red-600">{error}</div>}


                    <button type="submit" className="mt-2 rounded-md bg-nautral-900 py-2 text-sm text-white">
                        ورود
                    </button>
                </form>
             <div className="mt-4 flex justify-between text-xs text-nautral-500">
                <Link to="/forget-password">فراموشی رمز عبور</Link>
                <Link to="/signup">ساخت حساب جدید</Link>
             </div>
        </div>
         )
}