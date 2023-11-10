import {
  Container as BaseContainer,
  Typography,
  Theme,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { theme } from "../styles/theme";
import { ReactComponent as StonksSneakersSvg } from "../images/stonks.svg";

const Container = styled(BaseContainer)<{ theme: Theme }>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100vh",
}));

export const Home = () => {
  return (
    <Container theme={theme} maxWidth="xl">
      <Typography variant="h3" component="h1">Your collection</Typography>
      <Box width="300px" height="400px">
        <StonksSneakersSvg />
      </Box>
      Home
    </Container>
  );
};
