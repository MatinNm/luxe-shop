import type { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
