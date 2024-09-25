import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import DropdownMenu from "./dropdown_menu";
import SearchBar from "./searchbar";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        height: "10vh",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f4f4f4",
        color: "black",
        padding: 2,
      }}
    >
      <a href="/">
        <Typography component="h1" sx={{ fontSize: "2em", fontFamily: "Gowun Batang" }}>
          BestLibrary
        </Typography>
      </a>
      <SearchBar />
      {status === "authenticated" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5em",
          }}
        >
          <Typography component="p" sx={{ display: "inline" }}>
            Welcome {session.user.email}
          </Typography>
          <DropdownMenu />
        </Box>
      ) : (
        <Button variant="contained" onClick={() => signIn("keycloak")}>
          Log In
        </Button>
      )}
    </Box>
  );
};

export default Header;
