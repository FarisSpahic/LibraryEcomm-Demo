import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Theme } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import DropdownMenu from "./dropdown_menu";

// Define styles using makeStyles
const useStyles = makeStyles((theme: Theme) => ({
  headerStyle: {
    display: "flex",
    height: "10vh",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    color: "black",
    padding: theme.spacing(2),
  },
  headerText: {
    fontFamily: 'monospace',
  },
  headerUserDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.5em",
  },
  userStatusText: {
    display: "inline",
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const { data: session, status } = useSession();

  return (
    <header className={classes.headerStyle}>
      <h1 className={classes.headerText}>Header</h1>

      {status === "authenticated" ? (
        <div className={classes.headerUserDiv}>
          <p className={classes.userStatusText}>Welcome {session.user?.name}</p>
          <DropdownMenu />
        </div>
      ) : (
        <Button variant="contained" onClick={() => signIn("keycloak")}>
          Log In
        </Button>
      )}
    </header>
  );
};

export default Header;
