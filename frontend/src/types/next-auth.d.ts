import NextAuth, { DefaultSession } from "next-auth";

// Extend the `Session` interface to include `accessToken`
declare module "next-auth" {
  interface Session {
    accessToken?: string;  // Add accessToken to the session object
  }

  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
