import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),

  emailAndPassword: {
    enabled: true,

    // sendResetPassword: async ({ url, token }, request) => {
    //   console.log(`Reset your password: ${url}`, token, request?.url);
    // },
  },

  user: {
    changeEmail: {
      enabled: true,
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
