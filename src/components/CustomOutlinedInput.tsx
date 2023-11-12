import React from "react";
import {
  InputAdornment,
  OutlinedInput as OutlinedInputMui,
  styled,
} from "@mui/material";
import { ReactComponent as  SearchIcon } from "../images/search.svg";

const OutlinedInput = styled(OutlinedInputMui)(({ theme }) => ({
  height: "48px",
  minWidth: "284px",
  background: theme.palette.common.white,
  borderRadius: '8px',
  "&:hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.action.hover,
    },
  },
  "&:focus-within": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.action.focus,
    },
  },
}));

type CustomInputProps = {
  type: string;
  placeholder: string;
};

export const CustomOutlinedInput = ({ type, placeholder }: CustomInputProps) => {
  return (
    <OutlinedInput
      type={type}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      fullWidth
    />
  );
};
