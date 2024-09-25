import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LIBRARY_API_URL}api/Book?limit=5&searchTerm=${value}`
        );
        setSuggestions(response.data.rows); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.title);
    setSuggestions([]);
    router.push(`/book/${suggestion.ISBN}`);
  };

  const handleBlur = () => {
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <TextField
        style={{fontFamily: "Inter",}}
        label="Search Books"
        value={query}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        onBlur={handleBlur} // Clear input and suggestions on blur
      />
      {suggestions.length > 0 && (
        <div
          style={{
            fontFamily: "Inter",
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1,
            backgroundColor: "white",
            border: "1px solid #ccc",
            width: "100%",
          }}
        >
          {suggestions.map((suggestion: any) => (
            <MenuItem
              key={suggestion.id}
              onMouseDown={() => handleSuggestionClick(suggestion)}
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
