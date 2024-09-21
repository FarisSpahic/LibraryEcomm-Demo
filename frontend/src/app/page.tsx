"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Typography } from "@mui/material";

export default function Home() {

  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (!session) {
    // Show login button if not authenticated
    return (
      <div>
        <Typography>You are not logged in.</Typography>
        <Button variant="contained" onClick={() => signIn("keycloak")}>
          Log In with Keycloak
        </Button>
      </div>
    );
  }

  // Show user profile if authenticated
  return (
    <div>
      <Typography>Welcome, {session.user?.name}!</Typography>
      <Button variant="contained" onClick={() => signOut()}>
        Log Out
      </Button>
    </div>
  );
}
