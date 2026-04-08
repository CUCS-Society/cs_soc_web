import type { ReactNode } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function PostsLayout({ children }: { children: ReactNode }) {
  return <main className="flex min-h-screen flex-col">{children}</main>
}
