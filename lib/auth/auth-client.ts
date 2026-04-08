import { createAuthClient } from "better-auth/react"

const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_CLIENT_BASE_URL

export const authClient = createAuthClient({
  baseURL: baseURL || "http://localhost:3000",
  fetchOptions: { credentials: "include" }
})
