import React, { useEffect, useState, useCallback } from "react";
import { Typography, Grid, Container, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import RecipeCard from "./recipeCard/recipeCard";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const loadFavorites = useCallback(() => {
    if (isAuthenticated && user) {
      const stored = JSON.parse(localStorage.getItem(`favorites_${user.email}`)) || [];
      setFavorites(stored);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    if (location.state?.refresh) {
      loadFavorites();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, loadFavorites]);

  const handleToggleFavorite = (recipe) => {
    const updated = favorites.filter((item) => item.id !== recipe.id);
    setFavorites(updated);
    localStorage.setItem(`favorites_${user.email}`, JSON.stringify(updated));
  };

  const handleViewRecipe = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#d1b3c4",
        padding: "2rem",
        borderRadius: "12px",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Favourite Recipes
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/", { replace: true })}
        sx={{ mb: 2, backgroundColor: "#4a759a" }}
      >
        Back
      </Button>

      {!isAuthenticated ? (
        <Typography variant="h6" align="center" color="textSecondary">
          Please log in to view your favourite recipes.
        </Typography>
      ) : favorites.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No favourite recipes yet.
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="left">
          {favorites.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <RecipeCard
                recipe={recipe}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
                onViewRecipe={handleViewRecipe}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favourites;
