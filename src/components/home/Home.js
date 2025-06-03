
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Container,
  Stack,
  Pagination,
  CircularProgress,
  Box,
} from "@mui/material";
import Search from "../search/Search";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../recipeCard/recipeCard";
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const recipesPerPage = 6;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        setRecipes(response.data.recipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    if (isAuthenticated && user) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`)) || [];
      setFavorites(storedFavorites);
    }
  }, [isAuthenticated, user]);

  const toggleFavorite = (recipe) => {
    if (!isAuthenticated || !user) {
      navigate("/signup");
      return;
    }

    const isFav = favorites.some((item) => item.id === recipe.id);
    const updatedFavorites = isFav
      ? favorites.filter((item) => item.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${user.email}`, JSON.stringify(updatedFavorites));

    if (!isFav) navigate("/favourites", { state: { refresh: true } });
  };

  const handleRequireLogin = () => {
    navigate("/signup");
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = page * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const paginatedRecipes = recipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const displayRecipes = search ? filteredRecipes : paginatedRecipes;

  return (
    <Container
      className="home-container"
      maxWidth="xl"
      sx={{
        backgroundColor: "#d1b3c4",
        padding: "2rem",
        borderRadius: "12px",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" align="center" className="home-title" >
            Recipes
          </Typography>
          <Search search={search} setSearch={setSearch} />
          <Grid container spacing={4}>
            {displayRecipes.length > 0 ? (
              displayRecipes.map((recipe) => (
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
              <Typography variant="body1" align="center" className="no-recipes">
                No recipes found.
              </Typography>
            )}
          </Grid>

          {!search && (
            <Stack spacing={2} alignItems="center" marginTop={8}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, val) => setPage(val)}
                color="secondary"
              />
            </Stack>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
