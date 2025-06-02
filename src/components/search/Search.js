import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import Icon from "@mdi/react";
import { mdiMagnify, mdiClose } from "@mdi/js";

const Search = ({ search, setSearch }) => {
  const handleClear = () => setSearch('');

  return (
    
<Box
 sx={{
display: 'flex',
 justifyContent: 'center',
width: '100%',
 mt: 2,
mb: 2,
 }}
 >

    <TextField
      label="Search the recipe"
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{
        mb: 2,
        width: {
          xs: '90%',   
          sm: '22rem',    
          md: '26rem',
          lg:'40rem'    
        },
       
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 4,
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        '& .MuiInputLabel-root': {
          fontWeight: 500,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Icon path={mdiMagnify} size={1} />
            </InputAdornment>
          ),
          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end">
                <Icon path={mdiClose} size={1} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
    </Box>
  );
};

export default Search;
