import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactComponent as CalendarSvg } from "../images/calendar.svg";
import { ReactComponent as PriceSvg } from "../images/dollar-sign.svg";
import { ReactComponent as SizeSvg } from "../images/size.svg";
import { ToggleButtonWithIcon } from "./custom/ToggleButtonWithIcon";

export const Filters = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box display="flex" alignItems="center" gap={3}>
      {isMd && <Typography variant="body2">Sort by:</Typography>}
      <Box display="flex" gap={1}>
        <ToggleButtonWithIcon
          text="Oldest Year"
          value="jds"
          icon={<CalendarSvg />}
        />
        <ToggleButtonWithIcon
          text="Smallest Size"
          value="fds"
          icon={<PriceSvg />}
        />
        <ToggleButtonWithIcon
          text="Lowest Price"
          value="fds"
          icon={<SizeSvg />}
        />
      </Box>
    </Box>
  );
};
