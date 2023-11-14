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
import { useMutation } from "@tanstack/react-query";
import { sneakerApi } from "../api";

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

export const SneakerCard = ({
  _id,
  name,
  brand,
  price,
  size,
  year,
}: SneakerData) => {
  const theme = useTheme();

  const { mutate: deleteSneaker } = useMutation({
    mutationKey: ["/delete-sneaker"],
    mutationFn: (id: string) => sneakerApi.deleteSneaker(id),
  });

  return (
    <Card>
      <CardContent>
        <ContentHeader>
          <Box>
            <Typography variant="h3" component="h1">
              {name}
            </Typography>
            <Typography variant="body1" component="div">
              {brand}
            </Typography>
            <Rating
              sx={{
                display: "flex",
                marginTop: theme.spacing(1),
                "& .MuiRating-icon": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </Box>
          <Box onClick={() => deleteSneaker(_id)}>
            <TrashSvg />
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
            <Feature name="Year" value={year} />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ borderLeft: `1px solid ${theme.palette.divider}` }}
          >
            <Feature name="Size US" value={size} />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ borderLeft: `1px solid ${theme.palette.divider}` }}
          >
            <Feature name="Price" value={price} isPrice />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
