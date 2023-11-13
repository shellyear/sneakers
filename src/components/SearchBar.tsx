import React from "react";
import { InputAdornment } from "@mui/material";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { OutlinedInputCustom } from "./custom/OutlinedInputCustom";

export const SearchBar = () => {
  return (
    <OutlinedInputCustom
      type="search"
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      fullWidth
    />
  );
};
