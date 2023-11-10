import { createTheme } from "@mui/material/styles";

const colors = {
  red: "#EF233C",
  black: "#191919",
  lightGray: "#EEEFF0",
  gray: "#CCCCCC",
  darkGray: "#808080",
  white: "#FFFFFF",
  blackShadow: "#373737",
  blue: "#20A9F3",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.black,
      light: colors.blackShadow
    },
    secondary: {
      main: colors.gray,
      dark: colors.darkGray
    },
    error: {
      main: colors.red
    },
    common: {
      white: colors.white
    },
    action: {
      active: colors.black,
      hover: colors.blackShadow,
      focus: colors.blue
    },
    text: {
      primary: colors.black
    },
    background: {
      default: colors.lightGray,
    }
  },
  typography: {
    h1: {
      fontFamily: 'Boxing, sans-serif, serif',
      fontSize: 64,
      fontWeight: 400
    },
    h2: {
      fontFamily: 'Boxing, sans-serif, serif',
      fontSize: 36,
      fontWeight: 400
    },
    h3: {
      fontFamily: 'Excon, sans-serif, serif',
      fontSize: 24,
      fontWeight: 700
    },
    subtitle1: {
      fontFamily: 'Excon, sans-serif, serif',
      fontSize: 16,
      fontWeight: 700
    },
    button: {
      fontFamily: 'Excon, sans-serif, serif',
      fontSize: 16,
      fontWeight: 500
    },
    body1: {
      fontFamily: 'Excon, sans-serif, serif',
      fontSize: 16,
      fontWeight: 400
    },
    body2: {
      fontFamily: 'Excon, sans-serif, serif',
      fontSize: 14,
      fontWeight: 400
    }
  },
});
