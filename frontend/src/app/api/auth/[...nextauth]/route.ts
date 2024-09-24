import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

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

      // Add custom user data to session
      session.user.userId = token.userId; // User ID from Keycloak
      session.user.email = token.email; // Email from Keycloak
      session.user.roles = token.roles; 
      return session;
    },
  },
});

export { handler as GET, handler as POST };