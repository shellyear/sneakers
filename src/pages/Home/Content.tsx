import { NoSortedSneakerNotice } from "../../components/notice/NoSortedSneakerNotice";
import { SneakersGrid } from "../../components/SneakersGrid";
import { SneakerData } from "../../types";
import { Box } from "@mui/material";
import { NoSneakerNotice } from "../../components/notice/NoSneakerNotice";

type ContentProps = {
  hasSneakers?: boolean;
  sortedSneakers?: SneakerData[];
  isMd: boolean;
};

export const Content = ({ hasSneakers, sortedSneakers, isMd }: ContentProps) => {
  const sortedSneakersExist = sortedSneakers && sortedSneakers.length > 0;

  if (hasSneakers && !sortedSneakersExist) return <NoSortedSneakerNotice />;

  if (sortedSneakersExist) {
    return (
      <Box mt={isMd ? 2 : 3} mb={isMd ? 2 : 8}>
        <SneakersGrid items={sortedSneakers} />
      </Box>
    );
  }

  return <NoSneakerNotice />;
};
