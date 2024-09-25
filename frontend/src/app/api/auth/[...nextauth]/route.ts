import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt from "jsonwebtoken";
const handler = NextAuth({
  providers: [
    KeycloakProvider({
        clientId: "libraryapp",
        clientSecret: "EBbMvyEzd1Yz0cDt9WCFPh2DBJPnOa2S",
        issuer: "http://localhost:8080/realms/libraryrealm",
    }),
  ],
  secret: "pqe8qkvnLo4TDVDFoFCY/87zxew9BE7So1twhS9Xpj4=",
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.expires_at = account.expires_at;

        if (account?.access_token) {
          let decodedToken = jwt.decode(account?.access_token);
          if (decodedToken && typeof decodedToken !== 'string') {
            const roles = decodedToken?.realm_access; // Extract roles from realm_access
            console.log("token got roles:", roles)
            token.roles = roles?.roles;
          }
        }
        
  
        // Add custom user data from Keycloak to the JWT
        token.userId = profile.sub; // Keycloak stores user ID in `sub`
        token.email = profile.email; // Email is available in the profile
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.idToken = token.idToken;
      session.expires_at = token.expires_at;
      session.user.firstName = token.name;
      session.user.userId = token.userId; // User ID from Keycloak
      session.user.email = token.email; // Email from Keycloak
      if (session?.user) session.user.roles = token.roles;
      return session;
    },
  },
});

export { handler as GET, handler as POST };