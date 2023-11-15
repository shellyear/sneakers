import { Typography, Box, useMediaQuery, styled } from "@mui/material";
import { theme } from "../../static/styles/theme";
import {
  SearchBar,
  SearchResults,
  useSearchBar,
} from "../../components/SearchBar";
import { ReactComponent as PlusIcon } from "../../static/images/plus.svg";
import { ButtonWithIcon } from "../../components/custom/ButtonWithIcon";
import { AddSneakersModal } from "../../components/modals/AddSneakersModal";
import { useModal } from "../../hooks";
import {
  Filters,
  FiltersEnum,
  useSneakerFilters,
} from "../../components/Filters";
import { Slider } from "../../components/Slider";
import { sneakerApi } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SneakerData } from "../../types";
import { Content } from "./Content";
import { Controls } from "./Controls";
import { RefetchContext } from "../../context";

const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  padding: "84px 22px 56px 22px",
  [theme.breakpoints.up("md")]: {
    padding: "56px 22px", // padding for medium and bigger screens
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

const FilterAndSearch = styled(Box)<{
  space: string;
}>`
  display: flex;
  justify-content: end;

  ${({ space }) =>
    space &&
    `
    justify-content: space-between;
  `}
`;

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
  const { searchTerm, onSearchChange, filterBySearch } = useSearchBar();
  const { data, refetch } = useQuery({
    queryKey: ["get-sneakers"],
    queryFn: () => sneakerApi.getSneakers(),
  });

  const sneakersExist = data && data.length > 0;

  let sortedSneakers = useMemo(() => {
    if (data) {
      const sortFunctions = {
        [FiltersEnum.ALL]: (data: SneakerData[]) => data,
        [FiltersEnum.NEW]: newestFirst,
        [FiltersEnum.CHEAPEST]: cheapestFirst,
        [FiltersEnum.SMALLEST]: smallestFirst,
      };

      return sortFunctions[filter] ? sortFunctions[filter](data) : data;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filter]);

  sortedSneakers = useMemo(() => {
    if (sortedSneakers) {
      return filterBySearch(sortedSneakers, searchTerm);
    }
    return sortedSneakers;
  }, [filterBySearch, searchTerm, sortedSneakers]);

  return (
    <RefetchContext.Provider value={{ refetch }}>
      <Container>
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
              <SearchBar searchTerm={searchTerm} onChange={onSearchChange} />
              {!isMd && searchTerm && (
                <Box mt={3}>
                  <SearchResults
                    searchTerm={searchTerm}
                    amount={sortedSneakers?.length || 0}
                  />
                </Box>
              )}
            </Box>
            {isMd && (
              <Box flex={1}>
                <ButtonWithIcon
                  height={48}
                  startIcon={<PlusIcon />}
                  text="Add new sneakers"
                  onClick={openModal}
                />
              </Box>
            )}
          </HeaderRight>
        </Header>
        {sneakersExist && isMd && (
          <FilterAndSearch mt={6} space={searchTerm}>
            {searchTerm && (
              <SearchResults
                searchTerm={searchTerm}
                amount={sortedSneakers?.length || 0}
              />
            )}
            <Filters active={filter} onClick={onFilterClick} />
          </FilterAndSearch>
        )}
        <Content
          hasSearchTerm={Boolean(searchTerm)}
          isMd={isMd}
          hasSneakers={sneakersExist}
          sortedSneakers={sortedSneakers}
        />
        <Controls openModal={openModal} sneakersExist={sneakersExist} />
        <AddSneakersModal open={open} handleClose={closeModal} />
      </Container>
    </RefetchContext.Provider>
  );
};

export default Home;
