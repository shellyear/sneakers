import {
  Box,
  Card as CardMui,
  CardContent as Content,
  Grid,
  Rating,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { ReactComponent as TrashSvg } from "../static/images/trash.svg";
import { SneakerData } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sneakerApi } from "../api";
import React from "react";

interface SneakerCardProps extends SneakerData {
  onClick: (data: SneakerData) => void;
}

type FeatureProps = {
  name: string;
  value: string | number;
  isPrice?: boolean;
};

const Card = styled(CardMui)(({ theme }) => ({
  borderRadius: 12,
}));

const CardContent = styled(Content)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ContentHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const Feature = ({ name, value, isPrice }: FeatureProps) => (
  <Box>
    <Typography variant="subtitle1" component="div">
      {isPrice && "$"}
      {value}
    </Typography>
    <Typography variant="body1">{name}</Typography>
  </Box>
);

export const SneakerCard = ({ onClick, ...data }: SneakerCardProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { mutate: deleteSneaker } = useMutation({
    mutationKey: ["/delete-sneaker"],
    mutationFn: (id: string) => sneakerApi.deleteSneaker(id),
    onSuccess: () => {
      // refetch when needed
      queryClient.invalidateQueries({ queryKey: ["get-sneakers"] });
    },
  });

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSneaker(data._id);
  };

  return (
    <Card onClick={() => onClick(data)}>
      <CardContent>
        <ContentHeader>
          <Box>
            <Typography variant="h3" component="h1">
              {data.name}
            </Typography>
            <Typography variant="body1" component="div">
              {data.brand}
            </Typography>
            <Rating
              value={data.rating}
              sx={{
                display: "flex",
                marginTop: theme.spacing(1),
                "& .MuiRating-icon": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </Box>
          <Box>
            <TrashSvg onClick={onDelete}/>
          </Box>
        </ContentHeader>
        <Grid
          container
          columnSpacing={2}
          gridTemplateColumns="1fr 1fr 1fr"
          mt={3}
          width="100%"
        >
          <Grid item xs={4}>
            <Feature name="Year" value={data.year} />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ borderLeft: `1px solid ${theme.palette.divider}` }}
          >
            <Feature name="Size US" value={data.size} />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ borderLeft: `1px solid ${theme.palette.divider}` }}
          >
            <Feature name="Price" value={data.price} isPrice />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
