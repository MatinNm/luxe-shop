import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import {Layout} from "./components/Layout"
import {ShopPage} from "./pages/ShopPage"
import {Checkout} from "./pages/Checkout"
import {Login} from "./pages/Login"
import {Signup} from "./pages/Signup"
import {ForgetPassword} from "./pages/ForgetPassword"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}
