import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, db, sessions, verificationTokens } from "../db/schema";
import { users } from '../db/schema';
import { AdapterUser } from "next-auth/adapters";
import { GoogleProfile } from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GitHub,
    Google({
      allowDangerousEmailAccountLinking: true,
      async profile(profile: GoogleProfile) {
        return { ...profile, image: profile.picture, role: profile.role ?? "user"}
      }
    })
    ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role ?? "user";
      session.user.test = user.image;
      return session;
    }
  }
});
