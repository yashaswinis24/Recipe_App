
import React from "react";
import { Zoom, useScrollTrigger, Fab } from "@mui/material";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTopButton = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold:0.1,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="secondary"
        size="small"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
        aria-label="scroll back to top"
      >
        <UpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollTopButton;
