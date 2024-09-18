import { UserRole, User } from "@libsql/client"
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}