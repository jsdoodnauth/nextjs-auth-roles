import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, db, sessions, verificationTokens, users, User } from "../db/schema";
import { GoogleProfile } from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import {bcrypt} from "bcrypt";
import crypto from "crypto";
import { eq } from "drizzle-orm";
const ITERATIONS = 10000;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    // Credentials({
    //   credentials: { 
    //     email: { label: "Email", type: "text"},
    //     password: { label: "Password", type: "password" }
    //   },
    //   authorize: async (credentials) => {
    //     let user = null
    //     const pwHash = await bcrypt.hash(credentials.password, 10)
    //     user = await getUserFromDb(credentials.email, pwHash)
 
    //     if (!user) {
    //       // No user found, so this is their first attempt to login
    //       // meaning this is also the place you could do registration
    //       throw new Error("User not found.")
    //     }

    //     return user

    //     // if (c.password !== "password") return null
    //     // return {
    //     //   id: "test",
    //     //   name: "Test User",
    //     //   email: "test@example.com",
    //     //   role: "user"
    //     // }
    //   },
    // }),
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

async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

// export async function verifyPassword(email: string, plainTextPassword: string) {
//   const user = await getUserByEmail(email);

//   if (!user) {
//     return false;
//   }

//   const account = await getAccountByUserId(user.id);

//   if (!account) {
//     return false;
//   }

//   const salt = account.salt;
//   const savedPassword = account.password;

//   if (!salt || !savedPassword) {
//     return false;
//   }

//   const hash = await hashPassword(plainTextPassword, salt);
//   return account.password == hash;
// }

// export async function getUserByEmail(email: string) {
//   const user = await db.query.users.findFirst({
//     where: eq(users.email, email),
//   });

//   return user;
// }

// export async function getMagicUserAccountByEmail(email: string) {
//   const user = await db.query.users.findFirst({
//     where: eq(users.email, email),
//   });

//   return user;
// }

// export async function getAccountByUserId(userId: UserId) {
//   const account = await db.query.accounts.findFirst({
//     where: eq(accounts.userId, userId),
//   });

//   return account;
// }