import React from "react";
import { Box, Typography, Link } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#5f0f40",
        color: "#fff8e1",
        py: 1,

        textAlign: "center",
      }}
    >
      <RestaurantMenuIcon />

      <Typography variant="body2">
        Cook. Taste. Share. © {new Date().getFullYear()} Recipe Haven. All
        rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
