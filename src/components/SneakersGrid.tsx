import { Box, styled } from "@mui/material";
import { SneakerData } from "../types";
import { SneakerCard } from "./SneakerCard";

type SneakersGridProps = {
  items: SneakerData[];
};

const Grid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  [theme.breakpoints.up("md")]: {
    gap: 20,
  },
}));

export const SneakersGrid = ({ items }: SneakersGridProps) => {
  return (
    <Grid>
      {items.map((item) => (
        <SneakerCard key={item._id} {...item} />
      ))}
    </Grid>
  );
};
