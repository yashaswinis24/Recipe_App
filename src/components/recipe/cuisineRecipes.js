import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import RecipeCard from "../recipeCard/recipeCard";

const CuisineRecipes = () => {
  const { cuisineType } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((res) => {
        const filtered = res.data.recipes.filter(
          (recipe) =>
            recipe.cuisine?.toLowerCase() === cuisineType?.toLowerCase()
        );
        setRecipes(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });

    if (isAuthenticated && user) {
      const storedFavorites =
        JSON.parse(localStorage.getItem(`favorites_${user.email}`)) || [];
      setFavorites(storedFavorites);
    } else {
      setFavorites([]);
    }
  }, [cuisineType, isAuthenticated, user]);

  const toggleFavorite = (recipe) => {
    if (!isAuthenticated || !user) {
      navigate("/signup");
      return;
    }

    const isFavorite = favorites.some((item) => item.id === recipe.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((item) => item.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem(
      `favorites_${user.email}`,
      JSON.stringify(updatedFavorites)
    );

    if (!isFavorite) navigate("/favourites", { state: { refresh: true } });
  };

  const handleRequireLogin = () => {
    navigate("/signup");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#d1b3c4",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={favorites.some((item) => item.id === recipe.id)}
                  onToggleFavorite={isAuthenticated ? toggleFavorite : null}
                  onRequireLogin={!isAuthenticated ? handleRequireLogin : null}
                  onViewRecipe={(recipe) => {
                    if (!isAuthenticated) {
                      navigate("/signup");
                    } else {
                      navigate(`/recipe/${recipe.id}`);
                    }
                  }}
                />
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              align="center"
              sx={{ width: "100%", mt: 4 }}
            >
              No recipes found for this cuisine.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default CuisineRecipes;
