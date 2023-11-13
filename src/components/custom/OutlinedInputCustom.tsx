import { OutlinedInput, styled } from "@mui/material";

export const OutlinedInputCustom = styled(OutlinedInput)(({ theme }) => ({
  height: "48px",
  minWidth: "284px",
  background: theme.palette.common.white,
  borderRadius: "8px",
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
