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
      </head>
      <body style={{ margin: 0 }}>
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
