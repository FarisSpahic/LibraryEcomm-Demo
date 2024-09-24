"use client";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body style={{ margin: 0, fontFamily: "Inter" }}>
          <SessionProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "white",
              }}
            >
              <Header />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  backgroundColor: "white",
                  minHeight: '80vh',
                }}
              >
                {children}
              </Box>
              <Footer />
            </Box>
          </SessionProvider>

      </body>
    </html>
  );
}
