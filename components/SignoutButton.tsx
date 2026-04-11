"use client"

import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"

export function SignoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/soc_web")
          router.refresh()
        },
      },
    })
  }

  return (
    <Button variant="outline" size="icon" onClick={handleLogout}>
      <LogOut className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <span className="sr-only">Log out</span>
    </Button>
  )
}
