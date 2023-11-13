import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactComponent as CalendarSvg } from "../static/images/calendar.svg";
import { ReactComponent as PriceSvg } from "../static/images/dollar-sign.svg";
import { ReactComponent as SizeSvg } from "../static/images/size.svg";
import { ToggleButtonWithIcon } from "./custom/ToggleButtonWithIcon";
import { SneakerData } from "../types";

type FilterProps = {
  onClick: (e: React.MouseEvent<HTMLElement>, value: any) => void;
};

export enum FiltersEnum {
  ALL = "all",
  NEW = "newest",
  SMALLEST = "smallest",
  CHEAPEST = "cheapest",
}

export const useSneakerFilters = () => {
  const [filter, setFilter] = useState<FiltersEnum>(FiltersEnum.ALL);

  const sortByYear = (data: SneakerData[]) =>
    data.slice().sort((a, b) => b.year - a.year);

  const sortByPrice = (data: SneakerData[]) =>
    data.slice().sort((a, b) => b.price - a.price);

  const sortBySize = (data: SneakerData[]) =>
    data.slice().sort((a, b) => b.size - a.size);

  const onFilterClick = (e: React.MouseEvent<HTMLElement>, value: string) => {
    setFilter(value as FiltersEnum);
  };

  return {
    filter,
    setFilter,
    sortByYear,
    sortByPrice,
    sortBySize,
    onFilterClick,
  };
};

export const Filters = ({ onClick }: FilterProps) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box display="flex" alignItems="center" gap={3}>
      {isMd && <Typography variant="body2">Sort by:</Typography>}
      <Box display="flex" gap={1}>
        <ToggleButtonWithIcon
          value={FiltersEnum.NEW}
          text="Newest"
          icon={<CalendarSvg />}
          onClick={onClick}
        />
        <ToggleButtonWithIcon
          value={FiltersEnum.SMALLEST}
          text="Smallest Size"
          icon={<PriceSvg />}
          onClick={onClick}
        />
        <ToggleButtonWithIcon
          value={FiltersEnum.CHEAPEST}
          text="Lowest Price"
          icon={<SizeSvg />}
          onClick={onClick}
        />
      </Box>
    </Box>
  );
};
