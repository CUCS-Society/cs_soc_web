import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "@/lib/prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000/~cnchor4",
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    useSecureCookies: false,
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const email = user.email?.toLowerCase() ?? "";

          const allowedDomains = ["cse.cuhk.edu.hk"];
          const allowedEmails = ["cscs@cse.cuhk.edu.hk"];

          const domain = email.split("@")[1];

          if (!allowedDomains.includes(domain) || !allowedEmails.includes(email)) {
              throw new Error("Email domain not allowed or user not authorized.");
          }
        }
      }
    }
  }
})
