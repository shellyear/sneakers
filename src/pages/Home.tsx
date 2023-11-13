import {
  Container as BaseContainer,
  Typography,
  Theme,
  Box,
  useMediaQuery,
  styled,
} from "@mui/material";
import { theme } from "../static/styles/theme";

import { SearchBar } from "../components/SearchBar";
import { ReactComponent as PlusIcon } from "../images/plus.svg";
import { ButtonWithIcon } from "../components/custom/ButtonWithIcon";
import { NoSneakerNotice } from "../components/NoSneakerNotice";
import { AddSneakersModal } from "../components/AddSneakersModal";
import { useModal } from "../hooks";

const Container = styled(BaseContainer)<{ theme: Theme }>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  padding: "84px 22px 56px 22px",
  [theme.breakpoints.up("md")]: {
    padding: "56px 50px", // padding for medium screens
  },
  [theme.breakpoints.up("lg")]: {
    padding: "56px 100px", // padding for larger screens
  },
}));

const Header = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
}));

const HeaderRight = styled(Box)`
  display: flex;
  gap: 16px;
`;

const Title = styled(Typography)(() => ({
  marginBottom: "18px",
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: theme.typography.h1.fontSize,
  },
}));

export const Home = () => {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { open, handleOpen, handleClose } = useModal();

  return (
    <Container theme={theme} maxWidth="xl">
      <Header>
        <Title variant="h2">Your collection</Title>
        <HeaderRight>
          <Box flex={1}>
            <SearchBar />
          </Box>
          {isMd && (
            <Box flex={1}>
              <ButtonWithIcon
                startIcon={<PlusIcon />}
                text="Add new sneakers"
                onClick={handleOpen}
              />
            </Box>
          )}
        </HeaderRight>
      </Header>
      <NoSneakerNotice />
      {!isMd && (
        <Box mt={24.5}>
          <ButtonWithIcon
            startIcon={<PlusIcon />}
            text="Add new sneakers"
            onClick={handleOpen}
          />
        </Box>
      )}
      <AddSneakersModal open={open} handleClose={handleClose} />
    </Container>
  );
};
