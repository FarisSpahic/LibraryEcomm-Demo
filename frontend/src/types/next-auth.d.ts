import "next-auth";

// Extend the session and JWT types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    expires_at?: number;
    user: {
      name?: string;
      userId?: string;
      email?: string;
      roles?: string[];
    };
  }

  interface User {
    name?: string;
    userId?: string;
    email?: string;
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    expires_at?: number;
    userId?: string;
    email?: string;
    roles?: string[];
  }
}
