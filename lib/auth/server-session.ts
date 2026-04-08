import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export const session = await auth.api.getSession({
  headers: await headers(),
})
