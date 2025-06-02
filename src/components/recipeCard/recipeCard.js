import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./recipeCard.css";

const RecipeCard = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  onViewRecipe,
  onRequireLogin,
}) => {
  const formatRecipeName = (name) => {
    const words = name.split(" ");
    if (words.length <= 3) return name;
    return `${words.slice(0, 3).join(" ")}\n${words.slice(3).join(" ")}`;
  };

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(recipe);
    } else if (onRequireLogin) {
      onRequireLogin();
    }
  };

  return (
    <Card className="recipe-card" sx={{ ml: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={recipe.image}
        alt={recipe.name}
        className="recipe-media"
      />
      <CardContent className="recipe-content" sx={{ padding: 5 }}>
        <Typography variant="h6" className="recipe-title">
          {formatRecipeName(recipe.name)}
        </Typography>
        <div className="recipe-actions">
          <IconButton
            onClick={handleFavoriteClick}
            color="error"
            className="recipe-icon-button"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Button
            color="secondary"
            className="recipe-button"
            onClick={() => onViewRecipe(recipe)}
          >
            Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
