import React from "react";
import { Box } from "@mui/material";



const Banner = () => {
  return (
    <Box
      sx={{
        width: "80vw", // Adjust width as per your requirements
        height: "40vh", // Adjust height as per your requirements
        position: "relative",
        backgroundColor: "primary.main", // Fallback color using theme
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "2rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <img src="/images/front-banner-1.jpg" alt="Test Image" style={{
          width: "100%",
          height: "70vh",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10000, // Send the image behind the text
        }} />

    </Box>
  );
};

export default Banner;
