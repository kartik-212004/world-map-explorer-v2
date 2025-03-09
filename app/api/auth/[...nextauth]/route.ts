import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        isSignUp: { label: "Is Sign Up", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const { email, password, isSignUp } = credentials;
          const existingUser = await prisma.credentialUser.findUnique({
            where: { email }
          });

          if (isSignUp === 'true') {
            // Handle Sign Up
            if (existingUser) {
              throw new Error("User already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const defaultName = email.split('@')[0];
            
            const newUser = await prisma.credentialUser.create({
              data: {
                email,
                password: hashedPassword,
                name: defaultName
              }
            });

            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name || defaultName
            };
          } else {
            // Handle Sign In
            if (!existingUser) {
              throw new Error("No user found with this email");
            }

            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
              throw new Error("Invalid password");
            }

            return {
              id: existingUser.id,
              email: existingUser.email,
              name: existingUser.name || email.split('@')[0]
            };
          }
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin"
  },
  session: {
    strategy: "jwt"
  }
});

export { handler as GET, handler as POST };
