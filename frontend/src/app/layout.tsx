"use client";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SessionProvider } from "next-auth/react";


// Define styles using makeStyles
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    margin: 0,
  },
  main: {
    flexGrow: 1,
  },
  body: {
    margin: 0,
  },
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classes = useStyles(); // Use the makeStyles styles
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={classes.root}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SessionProvider>
            <Header />
            <main className={classes.main}>{children}</main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
