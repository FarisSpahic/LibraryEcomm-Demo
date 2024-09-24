declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userId?: string;      // Add userId (Keycloak user ID) to the session
    expires?: string;     // Session expiration time
    roles?: string[];     // User roles
  }

  interface User {
    accessToken?: string;
    userId?: string;      // Add userId (Keycloak user ID)
    roles?: string[];     // User roles
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userId?: string;      // Add userId (Keycloak user ID)
    roles?: string[];     // User roles
    expires?: string;     // Token expiration time
  }
}
