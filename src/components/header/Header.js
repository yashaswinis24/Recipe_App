import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [drawerRecipesOpen, setDrawerRecipesOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((res) => {
        const uniqueCuisines = [
          ...new Set(res.data.recipes.map((r) => r.cuisine)),
        ];
        setCuisines(uniqueCuisines);
      })
      .catch((err) => console.error("Failed to fetch cuisines", err));
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCuisineSelect = (cuisine) => {
    navigate(`/cuisine/${cuisine}`);
    handleMenuClose();
    setDrawerOpen(false);
  };

  const handleFavouritesClick = () => {
    if (isAuthenticated) {
      navigate("/favourites");
    } else {
      alert("Please log in to view your favourites.");
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" color="primary" className="header-appbar">
      <Toolbar className="header-toolbar" sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          className="header-title"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          Recipe App
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isMobile ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button className="header-button" onClick={() => navigate("/")}>
                Home
              </Button>

              <Button
                className="header-button"
                onClick={handleMenuOpen}
                aria-controls={Boolean(anchorEl) ? "recipe-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              >
                Munch Menu
              </Button>

              <Menu
                id="recipe-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
              >
                {cuisines.map((cuisine, index) => (
                  <MenuItem key={index} onClick={() => handleCuisineSelect(cuisine)}>
                    {cuisine}
                  </MenuItem>
                ))}
              </Menu>

              <Button className="header-button" onClick={handleFavouritesClick}>
                Favourites
              </Button>

              {isAuthenticated ? (
                <>
                  <Typography variant="body1" className="header-welcome">
                    Welcome
                  </Typography>
                  <Button className="header-button" onClick={() => navigate("/logout")}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button className="header-button" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button className="header-button" onClick={() => navigate("/signup")}>
                    Signup
                  </Button>
                </>
              )}
            </Stack>
          ) : (
            <>
              <Typography variant="body1" className="header-welcome" sx={{ mr: 2 }}>
                Welcome
              </Typography>
              <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                  <List>
                    <ListItem button onClick={() => navigate("/")}>
                      <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button onClick={() => setDrawerRecipesOpen(!drawerRecipesOpen)}>
                      <ListItemText primary="Recipes" />
                      {drawerRecipesOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={drawerRecipesOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {cuisines.map((cuisine, index) => (
                          <ListItem
                            button
                            key={index}
                            sx={{ pl: 4 }}
                            onClick={() => handleCuisineSelect(cuisine)}
                          >
                            <ListItemText primary={cuisine} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>

                    <ListItem
                      button
                      onClick={() => {
                        handleFavouritesClick();
                        setDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary="Favourites" />
                    </ListItem>

                    {isAuthenticated ? (
                      <ListItem button onClick={() => navigate("/logout")}>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    ) : (
                      <>
                        <ListItem button onClick={() => navigate("/login")}>
                          <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button onClick={() => navigate("/signup")}>
                          <ListItemText primary="Signup" />
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
