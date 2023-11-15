import { InputAdornment } from "@mui/material";
import { ReactComponent as SearchIcon } from "../static/images/search.svg";
import { OutlinedInputCustom } from "./custom/OutlinedInputCustom";
import { useState, ChangeEvent, useCallback } from "react";
import { SneakerData } from "../types";

type SearchBarProps = {
  searchTerm: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const filterBySearch = useCallback((data: SneakerData[], searchTerm: string) => {
    return data.filter((item) =>
      Object.values(item)
        .map((value) => String(value).toLowerCase())
        .some((value) => value.includes(searchTerm.toLowerCase()))
    );
  }, []);

  return {
    searchTerm,
    onSearchChange,
    filterBySearch
  };
};

export const SearchBar = ({ searchTerm, onChange }: SearchBarProps) => {
  return (
    <OutlinedInputCustom
      type="search"
      placeholder="Search"
      value={searchTerm}
      onChange={onChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      fullWidth
    />
  );
};
