import React, { useEffect, useState } from "react";
import { Typography, Grid, Container,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./recipeCard/recipeCard";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const handleToggleFavorite = (recipe) => {
    const updated = favorites.filter((item) => item.id !== recipe.id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    navigate("/");
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
        onClick={() => navigate("/")}
        sx={{ mb: 2 ,backgroundColor: "#4a759a"}}
      >
        Back 
      </Button>
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
    </Container>
  );
};

export default Favourites;
