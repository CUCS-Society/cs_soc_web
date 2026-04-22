"use client"

import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SigninButton() {
  const router = useRouter()

  const handleLogout = async () => {
    router.push("/soc_web/auth/sign-in")
  }

  return (
    <Button variant="outline" size="icon" onClick={handleLogout}>
      <LogIn className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Log out</span>
    </Button>
  )
}
