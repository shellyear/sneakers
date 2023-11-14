import { styled } from "@mui/material";
import { SneakerData } from "../types";
import { SneakerCard } from "./SneakerCard";
import { useModal } from "../hooks";
import { useState } from "react";
import { UpdateSneakerModal } from "./modals/UpdateSneakerModal";

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
  const { open, openModal, closeModal } = useModal();
  const [cardData, setCardData] = useState<SneakerData>();

  const onCardClick = (data: SneakerData) => {
    setCardData(data);
    openModal();
  };

  return (
    <>
      <Grid>
        {items.map((item) => (
          <SneakerCard key={item._id} {...item} onClick={onCardClick} />
        ))}
      </Grid>
      {cardData && (
        <UpdateSneakerModal
          open={open}
          handleClose={closeModal}
          data={cardData}
        />
      )}
    </>
  );
};
