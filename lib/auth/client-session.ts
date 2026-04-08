import { authClient } from "@/lib/auth/auth-client"

export const { data: session, error } = await authClient.getSession()