import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, MenuItem } from "@mui/material";
import axios from 'axios';

const useStyles = makeStyles(() => ({
  searchContainer: {
    position: "relative",
    backgroundColor: "white",
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    border: "1px solid #ccc",
    width: "100%",
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      try {
        let headers = new Headers();

        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        
        headers.append("Origin", "http://localhost:3000");
        console.log(
          "calling url: ",
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book?limit=5`
        );
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book?limit=5`, {
          }
        );
        console.log("received payload: ", response);


        console.log("received data: ", response);
        setSuggestions(response.data.rows); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    // Handle selection logic here (e.g., navigate to book details)
  };

  return (
    <div className={classes.searchContainer}>
      <TextField
        label="Search Books"
        value={query}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
      />
      {suggestions.length > 0 && (
        <div className={classes.suggestions}>
          {suggestions.map((suggestion: any) => (
            <MenuItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.title)}
            >
              {suggestion.title} {/* Adjust based on your suggestion data */}
            </MenuItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
