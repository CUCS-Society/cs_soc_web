import type { ReactNode } from "react"

export default function PostsLayout({ children }: { children: ReactNode }) {
  return <main className="flex min-h-screen flex-col">{children}</main>
}
