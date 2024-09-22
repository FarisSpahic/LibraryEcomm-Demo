import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

// Define styles using makeStyles
const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    width: "80vw", // Full width of the viewport
    height: "20vh", // Customize this based on how tall you want the banner
    position: "relative",
    backgroundColor: theme.palette.primary.main, // Fallback color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "2rem",
    textAlign: "center",
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1, // Send the image behind the text
  },


}));

interface BannerProps {
  imgSrc: string;
}

const Banner: React.FC<BannerProps> = ({ imgSrc }) => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <img
        src={imgSrc}
        alt="Banner"
        className={classes.bannerImage}
      />
    </div>
  );
};

export default Banner;
