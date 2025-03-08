import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials) {
          throw new Error("No Credentials Provided");
        }

        try {
          const { email, password } = credentials;
          if (!email || !password) {
            throw new Error("No Credentials Detected");
          }

          const existingUser = await prisma.credentialUser.findUnique({
            where: { email },
          });

          if (existingUser) {
            throw new Error("User Already Exists");
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await prisma.credentialUser.create({
            data: {
              email,
              password: hashedPassword,
            },
          });

          return newUser;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
