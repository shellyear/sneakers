import {
  Container as BaseContainer,
  Typography,
  Theme,
  Box,
  useMediaQuery,
  styled,
} from "@mui/material";
import { theme } from "../../static/styles/theme";

import { SearchBar } from "../../components/SearchBar";
import { ReactComponent as PlusIcon } from "../../static/images/plus.svg";
import { ButtonWithIcon } from "../../components/custom/ButtonWithIcon";
import { AddSneakersModal } from "../../components/AddSneakersModal";
import { useModal } from "../../hooks";
import {
  Filters,
  FiltersEnum,
  useSneakerFilters,
} from "../../components/Filters";
import { Slider } from "../../components/Slider";
import { sneakerApi } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SneakerData } from "../../types";
import { Content } from "./Content";
import { Controls } from "./Controls";

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

const Home = () => {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { filter, newestFirst, cheapestFirst, smallestFirst, onFilterClick } =
    useSneakerFilters();
  const { open, closeModal, openModal } = useModal();
  const [sortedSneakers, setSortedSneakers] = useState<SneakerData[]>();

  const { data, refetch } = useQuery({
    queryKey: ["/sneakers-data"],
    queryFn: () => sneakerApi.getSneakers(),
    enabled: filter === FiltersEnum.ALL,
  });

  const sneakersExist = data && data.length > 0;

  useEffect(() => {
    if (data) {
      if (filter === FiltersEnum.ALL) setSortedSneakers(data);
      if (filter === FiltersEnum.NEW) setSortedSneakers(newestFirst(data));
      if (filter === FiltersEnum.CHEAPEST)
        setSortedSneakers(cheapestFirst(data));
      if (filter === FiltersEnum.SMALLEST)
        setSortedSneakers(smallestFirst(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, data]);
  console.log({ filter, sortedSneakers });
  return (
    <Container theme={theme} maxWidth="xl">
      <Header>
        <Title variant="h2">Your collection</Title>
        {sneakersExist && !isMd && (
          <Box mb={2}>
            <Slider>
              <Filters active={filter} onClick={onFilterClick} />
            </Slider>
          </Box>
        )}
        <HeaderRight>
          <Box flex={1}>
            <SearchBar />
          </Box>
          {isMd && (
            <Box flex={1}>
              <ButtonWithIcon
                startIcon={<PlusIcon />}
                text="Add new sneakers"
                onClick={openModal}
              />
            </Box>
          )}
        </HeaderRight>
      </Header>
      {sneakersExist && isMd && (
        <Box mt={6} display="flex" justifyContent="end">
          <Filters active={filter} onClick={onFilterClick} />
        </Box>
      )}
      <Content
        isMd={isMd}
        hasSneakers={sneakersExist}
        sortedSneakers={sortedSneakers}
      />
      <Controls openModal={openModal} sneakersExist={sneakersExist} />
      <AddSneakersModal
        open={open}
        handleClose={closeModal}
        refetch={refetch}
      />
    </Container>
  );
};

export default Home;
