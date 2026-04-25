import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Credentials provider requires JWT session strategy
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        if (user.status === 'suspended') {
          throw new Error("Your account has been suspended. Please contact support.");
        }

        // Admin login flow (OTP)
        if (["admin", "super-admin"].includes(user.role)) {
          if (!credentials.otp) {
            throw new Error("OTP is required for admin login.");
          }
          
          if (!user.adminOtp || !user.adminOtpExpiry) {
            throw new Error("Invalid OTP or expired. Please request a new one.");
          }

          if (new Date() > user.adminOtpExpiry) {
            // Clear expired OTP
            await prisma.user.update({
              where: { id: user.id },
              data: { adminOtp: null, adminOtpExpiry: null }
            });
            throw new Error("OTP has expired. Please request a new one.");
          }

          if (user.adminOtp !== credentials.otp) {
            throw new Error("Invalid OTP code.");
          }

          // Clear OTP after successful login
          await prisma.user.update({
            where: { id: user.id },
            data: { adminOtp: null, adminOtpExpiry: null }
          });
        } 
        // Customer login flow (Password)
        else {
          if (!credentials.password || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // "customer", "admin", "super-admin"
          permissions: user.permissions,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.permissions = user.permissions;
      }
      
      // Allow modifying role/session
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }
      if (trigger === "update" && session?.permissions) {
        token.permissions = session.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },
});
