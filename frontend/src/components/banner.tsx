import React from "react";
import { Box } from "@mui/material";

interface BannerProps {
  imgSrc: string;
}

const Banner: React.FC<BannerProps> = ({ imgSrc }) => {
  return (
    <Box
      sx={{
        width: "80vw", // Adjust width as per your requirements
        height: "20vh", // Adjust height as per your requirements
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
      <Box
        component="img"
        src={imgSrc}
        alt="Banner"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1, // Send the image behind the text
        }}
      />
    </Box>
  );
};

export default Banner;
