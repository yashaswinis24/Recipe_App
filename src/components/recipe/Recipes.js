import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Stack,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Rating,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useParams, useNavigate } from "react-router-dom";
import "./Recipes.css";
import ScrollTopButton from "../scrollTop";

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipe:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6">Recipe not found.</Typography>
      </Container>
    );
  }

  return (
    <Container  sx={{ mt: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Back
      </Button>

      <Card className="recipe-card wide-card">
        <CardMedia
          component="img"
          height="400"
          image={recipe.image}
          alt={recipe.name}
        />
        <CardContent>
          <Typography variant="h4" className="recipe-title">
            {recipe.name}
          </Typography>

          <Stack className="rating-section">
            <Rating
              name="hover-rating"
              value={userRating}
              precision={0.5}
              onChange={(event, newValue) => setUserRating(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Typography variant="body1">{recipe.rating}</Typography>
            <Typography variant="body1">
              {recipe.reviewCount} reviews
            </Typography>
            <Typography variant="h6"> Preparation Time Minutes : {recipe.prepTimeMinutes}
            </Typography >
            <Typography variant="h6"> Cooking Time Minutes :  {recipe.cookTimeMinutes}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" className="recipe-section-title">
            Ingredients
          </Typography>
          <Container  className="ingredients-list">
            {recipe.ingredients.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <ListItem>
                  <ListItemText primary={item} />
                </ListItem>
              </Grid>
            ))}
          </Container>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" className="recipe-section-title">
            Instructions
          </Typography>
          <Typography variant="body1" className="recipe-instructions">
            {recipe.instructions}
          </Typography>
        </CardContent>
      </Card>
       <ScrollTopButton/>
    </Container>
   
  );
};

export default Recipe;
