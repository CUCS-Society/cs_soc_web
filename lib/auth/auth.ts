import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "../prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000/~cnchor4",
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    useSecureCookies: false 
  }
})
