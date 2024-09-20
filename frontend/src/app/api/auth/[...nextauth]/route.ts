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
});

export { handler as GET, handler as POST };