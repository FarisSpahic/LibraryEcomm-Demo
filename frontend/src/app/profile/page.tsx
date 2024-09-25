"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Typography, Box, Paper, Grid, Avatar, Button } from "@mui/material";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to home if unauthenticated
  if (status === "unauthenticated") {
    router.push("/");
  }
  console.log("roles: ", JSON.stringify(session));
  return (
    <Box
      sx={{ padding: "2em", backgroundColor: "#f4f4f4", minHeight: "100vh" }}
    >
      {status === "loading" ? (
        <Typography variant="h5" style={{color: 'black'}}>Loading...</Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{
            padding: "2em",
            maxWidth: 600,
            margin: "auto",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "2em" }}
          >
            <Avatar sx={{ width: 100, height: 100, marginRight: "1em" }} />
            <Box>
              <Typography variant="h4" gutterBottom>
                {session?.user?.firstName} {session?.user?.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {session?.user?.email}
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                User ID: {session?.user?.userId}
              </Typography>
            </Grid>
            {session?.user?.roles && (
              <Grid item xs={12}>
                <Typography variant="h6">
                  Roles:{" "}
                  {session.user.roles && session.user.roles.length > 0
                    ? session.user.roles.join(", ")
                    : "No roles assigned"}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")} // Button to go back to home
            sx={{ marginTop: "2em" }}
          >
            Go Back Home
          </Button>
        </Paper>
      )}
    </Box>
  );
}
