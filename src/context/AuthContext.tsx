import { useState , createContext , useEffect , useContext , type ReactNode} from "react";

type User = {
    name: string
    email: string
}

type AuthResult = {
    success: boolean
    message?: string
}

type StoredUsers = {
    name: string
    email: string
    password: string
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string , password: string) => AuthResult
    signup: (name: string , email: string , password: string) => AuthResult
    logout: () => void
}

const STORAGE_KEYS = {
    users: "app_users",
    currentUser: "current_user",
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function getStoredUsers(): StoredUsers[] {
    const raw = localStorage.getItem(STORAGE_KEYS.users)
    return raw ? JSON.parse(raw) : []
}

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEYS.currentUser)
        if (raw) setUser(JSON.parse(raw))
            setIsLoading(false)
    })

function login(email:string , password:string): AuthResult {
 const users = getStoredUsers()
 const found = users.find((u) => u.email===email && u.password===password)

 if (!found) return {success:false , message: "ایمیل یا رمز عبور اشتباه است"}

 const currentUser: User = {name: found.name , email: found.email }
 localStorage.setItem(STORAGE_KEYS.currentUser , JSON.stringify(currentUser))
 setUser(currentUser)
 return { success:true }
}
 
function signup(name: string , email: string , password: string): AuthResult {
    const users = getStoredUsers()
    if(users.some((u) => u.email === email)) {
        return { success: false , message: "این ایمیل قبلا ثبت شده است" } 
    }
    localStorage.setItem(STORAGE_KEYS.users , JSON.stringify([...users, { name, email, password}]))

    const currentUser: User = { name , email }
    localStorage.setItem(STORAGE_KEYS.currentUser , JSON.stringify(currentUser))
    setUser(currentUser)
    return {success:true}

}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.currentUser)
    setUser(null)
}

return (
    <AuthContext.Provider value={{ user , isAuthenticated: !!user , isLoading , login , signup , logout}}>
        {children}
    </AuthContext.Provider>
)
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده بشه")
    return ctx
}
