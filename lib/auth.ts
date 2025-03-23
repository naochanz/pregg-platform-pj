// lib/auth.ts
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./prismaClient";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password as string, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          professionalType: user.professionalType,
        };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any, user: any }) => {
      if (user) {
        token.id = user.id;
        token.professionalType = user.professionalType;
      }
      return token;
    },
    session: async ({ session, token }: { session: any, token: any }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.professionalType = token.professionalType as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);